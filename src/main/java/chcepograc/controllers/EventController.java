package chcepograc.controllers;

import chcepograc.api.CreateEvent;
import chcepograc.api.UpdateEvent;
import chcepograc.models.Event;
import chcepograc.models.EventType;
import chcepograc.models.User;
import chcepograc.repositories.EventRepository;
import chcepograc.repositories.EventTypeRepository;
import chcepograc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventTypeRepository eventTypeRepository;

    @GetMapping("/")
    public Iterable<Event> all() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable(value = "id") Integer eventId, HttpServletResponse response) {
        Optional<Event> event = findEventOrResponseNotFound(eventId, response);
        if (event == null) return null;

        return event.get();
    }

    @PostMapping("/")
    public Event create(@Valid @RequestBody CreateEvent requestParams, HttpServletResponse response) {
        Optional<User> owner = findCurrentUserOrResponseForbidden(response);
        if (owner == null) return null;

        Optional<EventType> eventType = findEventTypeOrResponseBadRequest(requestParams, response);
        if (eventType == null) return null;

        Event event = new Event().populate(requestParams);
        event.setOwner(owner.get());
        event.setEventType(eventType.get());

        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable(value = "id") Integer eventId, @Valid @RequestBody UpdateEvent requestParams, HttpServletResponse response) {
        Optional<Event> event = findEventOrResponseNotFound(eventId, response);
        if (event == null) return null;

        if (!validEventOwnershipOrResponseForbidden(response, event)) return null;

        event.get().populate(requestParams);

        return eventRepository.save(event.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable(value = "id") Integer eventId, HttpServletResponse response) {
        Optional<Event> event = findEventOrResponseNotFound(eventId, response);
        if (event == null) {
            response.setStatus(404);
            return null;
        }

        if (!validEventOwnershipOrResponseForbidden(response, event)) return null;

        eventRepository.delete(event.get());

        return ResponseEntity.ok().build();
    }

    private Optional<Event> findEventOrResponseNotFound(Integer eventId, HttpServletResponse response) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (!event.isPresent()) {
            response.setStatus(404);
            return null;
        }
        return event;
    }

    private Optional<User> findCurrentUserOrResponseForbidden(HttpServletResponse response) {

        // TODO: resolve current User ID and pass as Owner when login feature will be ready

        Optional<User> owner = userRepository.findById(1);
        if (!owner.isPresent()) {
            response.setStatus(403);
            return null;
        }
        return owner;
    }

    private boolean validEventOwnershipOrResponseForbidden(HttpServletResponse response, Optional<Event> event) {
        Optional<User> user = findCurrentUserOrResponseForbidden(response);
        if (user == null || event.get().getOwner() != user.get()) {
            response.setStatus(403);
            return false;
        }
        return true;
    }

    private Optional<EventType> findEventTypeOrResponseBadRequest(@Valid @RequestBody CreateEvent requestParams, HttpServletResponse response) {
        Optional<EventType> eventType = eventTypeRepository.findById(requestParams.getEventTypeId());
        if (!eventType.isPresent()) {
            response.setStatus(400);
            return null;
        }
        return eventType;
    }
}
