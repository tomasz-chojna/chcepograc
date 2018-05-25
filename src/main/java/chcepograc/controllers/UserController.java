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
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping(path="/api/users")
public class UserController {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @PostMapping(path="/")
    @ResponseBody
    User register(@Valid @RequestBody UserCandidate userCandidate) {
        User user = new User();
        user.setEmail(userCandidate.getEmail());
        user.setFirstName(userCandidate.getFirstName());
        user.setLastName(userCandidate.getLastName());
        user.setPhone(userCandidate.getPhone());
        user.setPassword(userCandidate.getPassword());

        entityManager.persist(user);
        entityManager.flush();

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
