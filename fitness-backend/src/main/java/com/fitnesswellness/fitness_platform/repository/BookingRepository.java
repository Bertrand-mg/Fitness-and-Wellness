package com.fitnesswellness.fitness_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitnesswellness.fitness_platform.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
