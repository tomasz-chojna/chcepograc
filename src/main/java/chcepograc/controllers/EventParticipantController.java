package chcepograc.controllers;

import chcepograc.models.EventParticipant;
import chcepograc.repositories.EventParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/event_participants")
public class EventParticipantController {

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @GetMapping(path="/")
    public @ResponseBody
    Iterable<EventParticipant> all() {
        return eventParticipantRepository.findAll();
    }

}
