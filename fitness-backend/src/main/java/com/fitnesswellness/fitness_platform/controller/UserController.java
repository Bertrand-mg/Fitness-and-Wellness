package com.fitnesswellness.fitness_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesswellness.fitness_platform.dto.UpdateProfileRequest;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/fetch-user")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/all-users")
    public Page<User> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return userService.getUsers(page, size);
    }

    @PostMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UpdateProfileRequest request) {
        return userService.updateUser(request);
    }

}
