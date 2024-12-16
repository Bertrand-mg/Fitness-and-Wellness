package com.fitnesswellness.fitness_platform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fitnesswellness.fitness_platform.dto.BookedProgram;
import com.fitnesswellness.fitness_platform.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
        @Query("SELECT new com.fitnesswellness.fitness_platform.dto.BookedProgram(p.name, p.price, b.bookingDate, u.name) "
                        +
                        "FROM Booking b " +
                        "JOIN b.program p " +
                        "JOIN b.customer u " +
                        "WHERE u.email = :email")
        Page<BookedProgram> findBookingsByUserEmail(String email, Pageable pageable);

        @Query("SELECT new com.fitnesswellness.fitness_platform.dto.BookedProgram(p.name, p.price, b.bookingDate, u.name) "
                        +
                        "FROM Booking b " +
                        "JOIN b.program p " +
                        "JOIN b.customer u")
        Page<BookedProgram> findBookings(Pageable pageable);

}
