package chcepograc.controllers;

import chcepograc.api.UserAttemptingLogin;
import chcepograc.api.UserCandidate;
import chcepograc.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import chcepograc.repositories.UserRepository;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletResponse;
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

    @Transactional
    @PostMapping(path="/logins")
    @ResponseBody
    User login(@Valid @RequestBody UserAttemptingLogin userAttemptingLogin, HttpServletResponse response) {
        Optional<User> user = userRepository.findByEmail(userAttemptingLogin.getEmail());

        if (!user.isPresent()) {
            response.setStatus(403);
            return null;
        }

        User foundUser = user.get();
        if (!foundUser.checkPassword(userAttemptingLogin.getPassword())) {
            response.setStatus(403);
            return null;
        }

        return user.get();
    }
}
