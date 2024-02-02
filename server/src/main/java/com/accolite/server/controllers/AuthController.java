package com.accolite.server.controllers;

import com.accolite.server.config.JWTService;
import com.accolite.server.exceptions.EmailNotFoundException;
import com.accolite.server.models.AuthTokenPayload;
import com.accolite.server.models.GoogleTokenPayload;
import com.accolite.server.models.User;
import com.accolite.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    JWTService jwtService;

    @Autowired
    UserRepository userRepository;

    private String googleTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo";

    @PostMapping("/LoginWithGoogle")
    public ResponseEntity<Map<String, Object>> loginWithGoogle(@RequestBody String googleToken) {
        try {
            // Validate Google token
            String tokenPayload = validateGoogleToken(googleToken);
            String email = validateEmail(googleToken);

            if (tokenPayload != null) {
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("status", "success");
                responseMap.put("tokenPayload", tokenPayload);
                responseMap.put("email", email);
                return ResponseEntity.ok(responseMap);
            } else {
                Map<String, Object> errorMap = new HashMap<>();
                errorMap.put("status", "error");
                errorMap.put("message", "Invalid Google token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMap);
            }
        } catch (Exception e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("status", "error");
            errorMap.put("message", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }

    private String validateGoogleToken(String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);
        String jwtToken;

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            jwtToken = jwtService.generateJWTToken(userRepository.findByEmail(response.getBody().getEmail()).get());
            System.out.println(jwtToken);
            return jwtToken;
        } else {
            return null;
        }
    }

    private String validateEmail(String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().getEmail();
        } else {
            return null;
        }
    }

    @PostMapping("/getAuthToken")
    private ResponseEntity<AuthTokenPayload> getAuthToken(@RequestBody String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);
        String jwtToken;

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        AuthTokenPayload authTokenPayload = new AuthTokenPayload();
        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            jwtToken = jwtService.generateJWTToken(userRepository.findByEmail(response.getBody().getEmail()).get());
            authTokenPayload.setJwtToken(jwtToken);
            return ResponseEntity.ok(authTokenPayload);
        } else {
            return null;
        }
    }

    @PostMapping("/getEmail")
    private ResponseEntity<GoogleTokenPayload> Email(@RequestBody String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            return response;
        } else {
            return null;
        }
    }

    @GetMapping("/getUser")
    private ResponseEntity<User> User(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new EmailNotFoundException("Email not found"));

        return ResponseEntity.ok(user);
    }


}