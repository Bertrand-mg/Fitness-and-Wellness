package com.fitnesswellness.fitness_platform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitnesswellness.fitness_platform.model.Program;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    boolean existsByName(String name);

    Page<Program> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String description, Pageable pageable);
}
