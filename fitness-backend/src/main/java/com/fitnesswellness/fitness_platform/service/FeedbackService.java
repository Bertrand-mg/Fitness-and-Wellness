package com.fitnesswellness.fitness_platform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fitnesswellness.fitness_platform.dto.SubmitFeedbackRequest;
import com.fitnesswellness.fitness_platform.model.Feedback;
import com.fitnesswellness.fitness_platform.model.Program;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.repository.FeedbackRepository;
import com.fitnesswellness.fitness_platform.repository.ProgramRepository;
import com.fitnesswellness.fitness_platform.repository.UserRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

    // Submit feedback
    public String submitFeedback(SubmitFeedbackRequest request) {
        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found!"));

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found!"));

        Feedback feedback = new Feedback();
        feedback.setCustomer(customer);
        feedback.setProgram(program);
        feedback.setComments(request.getComments());
        feedback.setRating(request.getRating());
        feedbackRepository.save(feedback);

        return "Feedback submitted successfully!";
    }

    // Get feedback by Program ID
    public List<Feedback> getFeedbackByProgram(Long programId) {
        return feedbackRepository.findByProgramId(programId);
    }

    // Delete feedback by ID
    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found!");
        }
        feedbackRepository.deleteById(id);
    }

    // Search feedback with pagination
    public Page<Feedback> searchFeedback(String keyword, Integer rating, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if (keyword != null && rating != null) {
            // Search by keyword and rating
            return feedbackRepository.findByCommentsContainingIgnoreCaseAndRating(keyword, rating, pageable);
        } else if (keyword != null) {
            // Search by keyword only
            return feedbackRepository.findByCommentsContainingIgnoreCase(keyword, pageable);
        } else if (rating != null) {
            // Search by rating only
            return feedbackRepository.findByRating(rating, pageable);
        } else {
            // Return all feedback with pagination
            return feedbackRepository.findAll(pageable);
        }
    }
}
