package com.fitnesswellness.fitness_platform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fitnesswellness.fitness_platform.dto.ProgramDTO;
import com.fitnesswellness.fitness_platform.model.Program;
import com.fitnesswellness.fitness_platform.repository.ProgramRepository;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    // Create a new program
    public String createProgram(Program program) {
        if (programRepository.existsByName(program.getName())) {
            throw new RuntimeException("Program with this name already exists!");
        }
        programRepository.save(program);
        return "Program created successfully!";
    }

    public Page<ProgramDTO> getPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Program> programs = programRepository.findAll(pageable);

        // Convert Program to ProgramDTO
        Page<ProgramDTO> programDTOs = programs.map(program -> new ProgramDTO(program));

        return programDTOs;
    }

    // Update an existing program
    public String updateProgram(Long id, Program updatedProgram) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found!"));

        program.setName(updatedProgram.getName());
        program.setDescription(updatedProgram.getDescription());
        program.setPrice(updatedProgram.getPrice());
        programRepository.save(program);

        return "Program updated successfully!";
    }

    // Delete a program
    public void deleteProgram(Long id) {
        if (!programRepository.existsById(id)) {
            throw new RuntimeException("Program not found!");
        }
        programRepository.deleteById(id);
    }

    public Page<Program> searchPrograms(String keyword, int page, int size, String sortBy, String direction) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());

        return programRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                keyword, keyword, pageable);
    }
}
