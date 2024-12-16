package com.fitnesswellness.fitness_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesswellness.fitness_platform.dto.ForgotPasswordRequest;
import com.fitnesswellness.fitness_platform.dto.LoginRequest;
import com.fitnesswellness.fitness_platform.dto.ResetPasswordRequest;
import com.fitnesswellness.fitness_platform.dto.SignupRequest;
import com.fitnesswellness.fitness_platform.dto.TwoFactorRequest;
import com.fitnesswellness.fitness_platform.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfileById(@PathVariable Long id) {
        return ResponseEntity.ok(authService.getProfileById(id));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        String jwtToken = authService.login(request);

        return ResponseEntity.ok(jwtToken);
    }

    @PostMapping("/validate-2fa")
    public ResponseEntity<?> validateTwoFactor(@RequestBody @Valid TwoFactorRequest request) {
        return ResponseEntity.ok(authService.validateTwoFactorCode(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        return ResponseEntity.ok(authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
            @RequestBody @Valid ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(token, request.getNewPassword()));
    }
}
