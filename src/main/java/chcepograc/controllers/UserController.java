package chcepograc.controllers;

import chcepograc.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import chcepograc.repositories.UserRepository;

@Controller
@RequestMapping(path="/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/")
    public @ResponseBody
    User create() {
        return userRepository.findById(1L).get();
    }

}
