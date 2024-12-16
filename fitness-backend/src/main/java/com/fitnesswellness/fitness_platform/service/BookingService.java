package com.fitnesswellness.fitness_platform.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitnesswellness.fitness_platform.dto.CreateBookingRequest;
import com.fitnesswellness.fitness_platform.dto.UpdateBookingRequest;
import com.fitnesswellness.fitness_platform.model.Booking;
import com.fitnesswellness.fitness_platform.model.Program;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.repository.BookingRepository;
import com.fitnesswellness.fitness_platform.repository.ProgramRepository;
import com.fitnesswellness.fitness_platform.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

    // Create a new booking
    public String createBooking(CreateBookingRequest request) {
        User customer = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Customer not found!"));

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found!"));

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setProgram(program);
        booking.setBookingDate(LocalDateTime.now());
        bookingRepository.save(booking);

        return "Booking created successfully!";
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
    }

    // Update a booking
    public String updateBooking(Long id, UpdateBookingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found!"));

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found!"));

        booking.setCustomer(customer);
        booking.setProgram(program);
        bookingRepository.save(booking);

        return "Booking updated successfully!";
    }

    // Cancel a booking
    public void cancelBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found!");
        }
        bookingRepository.deleteById(id);
    }
}
