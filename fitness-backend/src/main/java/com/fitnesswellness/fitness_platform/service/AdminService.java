package com.fitnesswellness.fitness_platform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitnesswellness.fitness_platform.dto.CreateProgramRequest;
import com.fitnesswellness.fitness_platform.dto.CreateTrainerRequest;
import com.fitnesswellness.fitness_platform.model.Program;
import com.fitnesswellness.fitness_platform.model.RoleEnum;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.repository.ProgramRepository;
import com.fitnesswellness.fitness_platform.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String createTrainer(CreateTrainerRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Trainer with this email already exists!");
        }

        User trainer = new User();
        trainer.setName(request.getName());
        trainer.setEmail(request.getEmail());
        trainer.setPassword(passwordEncoder.encode(request.getPassword()));
        trainer.setRole(RoleEnum.TRAINER);
        trainer.setTwoFactorEnabled(true);

        userRepository.save(trainer);
        return "Trainer account created successfully!";
    }

    public Page<User> searchUsers(String keyword, int page, int size, String sortBy, String direction) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());

        return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword, pageable);
    }

    public String createProgram(CreateProgramRequest request) {
        if (programRepository.existsByName(request.getName())) {
            throw new RuntimeException("Program with this name already exists!");
        }

        Program program = new Program();
        program.setName(request.getName());
        program.setDescription(request.getDescription());
        program.setPrice(request.getPrice());
        program.setUser(userRepository.findById(request.getTrainer()).get());

        programRepository.save(program);
        return "Program created successfully!";
    }

    public List<User> getUsersByRole(RoleEnum role) {
        return userRepository.findByRole(role);
    }
}
