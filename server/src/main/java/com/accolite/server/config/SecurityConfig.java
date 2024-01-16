package com.accolite.server.config;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig{

    @Autowired
    private JWTAuthenticationFilter jwtAuthFilter;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    public static final String[] WHITE_LIST_URL = {"/LoginWithGoogle", "/getEmail", "/api/users/checkEmail", "/getAuthToken", "/**"};
    public static final String[] PROTECTED_LIST_URL = {};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(req -> req.requestMatchers(WHITE_LIST_URL)
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .oauth2ResourceServer(oauth2ResourceServer ->
//                        oauth2ResourceServer
//                                .jwt(jwt -> jwt.decoder(jwtDecoder()))
//                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .httpBasic(Customizer.withDefaults());


        return http.build();
    }
//    @Bean
//    public JwtDecoder jwtDecoder() {
//        return JwtDecoders.fromOidcIssuerLocation("https://accounts.google.com");
//    }

}