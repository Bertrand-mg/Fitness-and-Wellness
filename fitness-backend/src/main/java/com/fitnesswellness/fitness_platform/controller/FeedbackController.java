package com.fitnesswellness.fitness_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesswellness.fitness_platform.dto.SubmitFeedbackRequest;
import com.fitnesswellness.fitness_platform.service.FeedbackService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Submit feedback
    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody @Valid SubmitFeedbackRequest request) {
        return ResponseEntity.ok(feedbackService.submitFeedback(request));
    }

    // Get feedback by Program ID
    @GetMapping("/program/{programId}")
    public ResponseEntity<?> getFeedbackByProgram(@PathVariable Long programId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByProgram(programId));
    }

    // Delete feedback by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok("Feedback deleted successfully!");
    }

    // Search and paginate feedback
    @GetMapping("/search")
    public ResponseEntity<?> searchFeedback(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(feedbackService.searchFeedback(keyword, rating, page, size));
    }
}
