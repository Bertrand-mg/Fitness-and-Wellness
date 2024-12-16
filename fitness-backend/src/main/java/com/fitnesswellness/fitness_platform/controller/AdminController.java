package com.fitnesswellness.fitness_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesswellness.fitness_platform.dto.CreateProgramRequest;
import com.fitnesswellness.fitness_platform.dto.CreateTrainerRequest;
import com.fitnesswellness.fitness_platform.model.RoleEnum;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create-trainer")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTrainer(@RequestBody @Valid CreateTrainerRequest request) {
        return ResponseEntity.ok(adminService.createTrainer(request));
    }

    @PostMapping("/create-program")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProgram(@RequestBody @Valid CreateProgramRequest request) {
        return ResponseEntity.ok(adminService.createProgram(request));
    }

    @GetMapping("/users/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<User>> searchUsers(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Page<User> users = adminService.searchUsers(keyword, page, size, sortBy, direction);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/fetch-trainers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserByRole(@RequestParam String role) {
        return ResponseEntity.ok(adminService.getUsersByRole(RoleEnum.valueOf(role)));
    }

}
