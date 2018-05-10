package chcepograc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO: For MVP it's disabled, should be enabled in prod and handled in the frontend app
        http.csrf().disable();

        http.authorizeRequests()
                // TODO: For early development real matchers are disabled:
                .regexMatchers(".*")
//                .antMatchers("/", "/api/users/", "/api/users/logins", "/js/**", "/css/**", "/img/**")
                .permitAll()
                .anyRequest().authenticated()
                .and()
            .logout()
                .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

    }
}