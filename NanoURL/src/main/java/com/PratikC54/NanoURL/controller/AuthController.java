package com.PratikC54.NanoURL.controller;

import com.PratikC54.NanoURL.dto.LoginRequest;
import com.PratikC54.NanoURL.dto.RegisterRequest;
import com.PratikC54.NanoURL.models.User;
import com.PratikC54.NanoURL.security.jwt.JwtAuthenticationResponse;
import com.PratikC54.NanoURL.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request){
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setRole("ROLE_USER");
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");

    }

    @PostMapping("/public/login")
    public ResponseEntity<JwtAuthenticationResponse> loginUser(@RequestBody LoginRequest request){
        return ResponseEntity.ok(userService.loginUser(request));
    }
}
