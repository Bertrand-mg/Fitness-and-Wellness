package com.fitnesswellness.fitness_platform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitnesswellness.fitness_platform.dto.UpdateProfileRequest;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public ResponseEntity<?> updateUser(UpdateProfileRequest request) {
        User fetchuser = getUserByEmail(request.getEmail());

        if (fetchuser == null)
            return ResponseEntity.badRequest().body("Invalid User");

        fetchuser.setName(request.getName());
        fetchuser.setEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getCurrentpassword(), fetchuser.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid Password");
        }
        fetchuser.setPassword(passwordEncoder.encode(request.getNewpassword()));
        fetchuser.setTwoFactorEnabled(true);

        userRepository.save(fetchuser);
        return ResponseEntity.ok("User profile updated");
    }

    public Page<User> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

}
