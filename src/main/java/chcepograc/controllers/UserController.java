package chcepograc.controllers;

import chcepograc.api.UserCandidate;
import chcepograc.models.User;
import chcepograc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

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
}
