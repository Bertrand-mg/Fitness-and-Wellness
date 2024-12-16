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

import com.fitnesswellness.fitness_platform.dto.BookedProgram;
import com.fitnesswellness.fitness_platform.dto.CreateBookingRequest;
import com.fitnesswellness.fitness_platform.dto.UpdateBookingRequest;
import com.fitnesswellness.fitness_platform.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping("/newbook")
    public ResponseEntity<?> createBooking(@RequestBody @Valid CreateBookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    // Get all bookings
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Only Admins can view all bookings
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    // Update a booking
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody @Valid UpdateBookingRequest request) {
        return ResponseEntity.ok(bookingService.updateBooking(id, request));
    }

    // Cancel a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking canceled successfully!");
    }

    @GetMapping("/user-bookings")
    public Page<BookedProgram> getUserBookings(
            @RequestParam String email,
            @RequestParam int page,
            @RequestParam int size) {

        // Call the service layer method to get paginated bookings
        return bookingService.getBookingsByUserEmail(email, page, size);
    }

    @GetMapping("/all-bookings")
    public ResponseEntity<Page<BookedProgram>> getBookings(
            @RequestParam int page,
            @RequestParam int size) {

        // Call the service layer method to get paginated bookings
        Page<BookedProgram> bookings = bookingService.getBookings(page, size);

        // Check if the bookings page is empty
        if (bookings.isEmpty()) {
            return ResponseEntity.noContent().build(); // Returns HTTP 204 No Content if the page is empty
        }

        return ResponseEntity.ok(bookings); // Returns HTTP 200 with the bookings if not empty
    }

}