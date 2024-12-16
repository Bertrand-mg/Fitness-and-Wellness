package com.fitnesswellness.fitness_platform.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitnesswellness.fitness_platform.model.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Find feedback by program ID
    List<Feedback> findByProgramId(Long programId);

    // Search by comments and rating with pagination
    Page<Feedback> findByCommentsContainingIgnoreCaseAndRating(String keyword, Integer rating, Pageable pageable);

    // Search by comments with pagination
    Page<Feedback> findByCommentsContainingIgnoreCase(String keyword, Pageable pageable);

    // Search by rating with pagination
    Page<Feedback> findByRating(Integer rating, Pageable pageable);
}
