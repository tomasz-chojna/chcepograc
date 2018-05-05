package chcepograc.controllers;

import chcepograc.models.Event;
import chcepograc.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping(path="/")
    public @ResponseBody
    Iterable<Event> all() {
        return eventRepository.findAll();
    }

}
