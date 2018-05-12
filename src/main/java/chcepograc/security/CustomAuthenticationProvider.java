package chcepograc.security;

import chcepograc.models.User;
import chcepograc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    private Logger logger = Logger.getLogger(CustomAuthenticationProvider.class.getName());

    @Transactional
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        Optional<User> user = userRepository.findByEmail(name);
        if (!user.isPresent()) {
            logger.warning(String.format("User with email=%s not found", name));
            throw new BadCredentialsException("Email or password invalid");
        }

        User foundUser = user.get();
        if (!foundUser.checkPassword(password)) {
            logger.warning(String.format("User %s filled wrong password=%s, should be %s", password, foundUser.getPassword()));
            throw new BadCredentialsException("Email or password invalid");
        }

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("USER"));

        return new UsernamePasswordAuthenticationToken(foundUser.getEmail(), foundUser.getPassword(), grantedAuthorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}