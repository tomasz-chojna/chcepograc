package chcepograc.controllers;

import chcepograc.api.UserCandidate;
import chcepograc.models.Event;
import chcepograc.models.User;
import chcepograc.repositories.EventRepository;
import chcepograc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping(path="/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Transactional
    @PostMapping(path="/new")
    @ResponseBody
    User register(@Valid @RequestBody UserCandidate userCandidate, HttpServletRequest request) {
        User user = new User();
        user.setEmail(userCandidate.getEmail());
        user.setFirstName(userCandidate.getFirstName());
        user.setLastName(userCandidate.getLastName());
        user.setPhone(userCandidate.getPhone());
        user.setPassword(userCandidate.getPassword());

        userRepository.save(user);

        try {
            request.login(user.getEmail(), user.getPassword());
        } catch (ServletException e) {
            e.printStackTrace();
        }

        user.setSessionToken(request.getSession().getId());

        return user;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    public User me(HttpServletRequest request) {
        Optional<User> user = findCurrentOptionalUser();
        if (user.isPresent()) {
            User foundUser = user.get();
            foundUser.setSessionToken(request.getSession().getId());
            return foundUser;
        }

        return null;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public User profile(@PathVariable(value = "id") Integer userId, HttpServletResponse response) {
        Optional<User> user = findUserOrResponseNotFound(userId, response);
        if (user == null) return null;

        return user.get();
    }

    @GetMapping("/{id}/events/{type}")
    @ResponseBody
    public Iterable<Event> all(@PathVariable("id") Integer userId, @PathVariable("type") String type, HttpServletResponse response) {
        Optional<User> user = findUserOrResponseNotFound(userId, response);
        if (user == null) return null;

        return eventRepository.findAll(user.get(), type);
    }

    private Optional<User> findCurrentOptionalUser() {
        Authentication auth  = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(auth.getName());
    }

    private Optional<User> findUserOrResponseNotFound(Integer userId, HttpServletResponse response) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            response.setStatus(404);
            return null;
        }
        return user;
    }
}
