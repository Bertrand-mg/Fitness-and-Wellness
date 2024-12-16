package com.fitnesswellness.fitness_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesswellness.fitness_platform.dto.ProgramDTO;
import com.fitnesswellness.fitness_platform.model.Program;
import com.fitnesswellness.fitness_platform.service.ProgramService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    // Create a new program
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Restricted to Admin
    public ResponseEntity<?> createProgram(@RequestBody @Valid Program program) {
        return ResponseEntity.ok(programService.createProgram(program));
    }

    @GetMapping("/all-programs")
    public Page<ProgramDTO> getPrograms(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return programService.getPrograms(page, size);
    }

    // Update a program
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Restricted to Admin
    public ResponseEntity<?> updateProgram(@PathVariable Long id, @RequestBody @Valid Program program) {
        return ResponseEntity.ok(programService.updateProgram(id, program));
    }

    // Delete a program
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Restricted to Admin
    public ResponseEntity<?> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.ok("Program deleted successfully!");
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Program>> searchPrograms(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Page<Program> result = programService.searchPrograms(keyword, page, size, sortBy, direction);
        return ResponseEntity.ok(result);
    }
}
