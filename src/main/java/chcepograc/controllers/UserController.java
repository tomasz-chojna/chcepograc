package chcepograc.controllers;

import chcepograc.api.UserCandidate;
import chcepograc.models.User;
import chcepograc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping(path="/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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

        return user;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    @ResponseBody
    public User me() {
        return findCurrentOptionalUser().orElse(null);
    }

    private Optional<User> findCurrentOptionalUser() {
        Authentication auth  = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(auth.getName());
    }
}
