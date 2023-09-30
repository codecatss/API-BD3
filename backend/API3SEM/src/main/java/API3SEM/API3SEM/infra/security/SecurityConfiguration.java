package API3SEM.API3SEM.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Auth Stateless
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/cr").hasRole("admin")
//                        .requestMatchers(HttpMethod.POST, "/cr").hasRole("admin")
//                        .requestMatchers(HttpMethod.PATCH, "/cr").hasRole("admin")
//                        .requestMatchers(HttpMethod.PUT, "/cr").hasRole("admin")
//                        .requestMatchers(HttpMethod.DELETE, "/cr").hasRole("admin")
//
//                        .requestMatchers(HttpMethod.GET, "/employee").hasRole("admin")
                        .requestMatchers(HttpMethod.POST, "/employee").hasRole("admin")
//                        .requestMatchers(HttpMethod.PATCH, "/employee").hasRole("admin")
//                        .requestMatchers(HttpMethod.PUT, "/employee").hasRole("admin")
//                        .requestMatchers(HttpMethod.DELETE, "/employee").hasRole("admin")
                        .anyRequest().authenticated()
                )
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        System.out.println("detalhes: " + authenticationConfiguration.toString());
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
