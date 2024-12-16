package com.fitnesswellness.fitness_platform.dto;

import java.time.LocalDateTime;

public class BookedProgram {

    private String programName;
    private double programPrice;
    private LocalDateTime bookingDate;
    private String userName;

    // Constructor
    public BookedProgram(String programName, double programPrice, LocalDateTime bookingDate, String userName) {
        this.programName = programName;
        this.programPrice = programPrice;
        this.bookingDate = bookingDate;
        this.userName = userName;
    }

    // Getters and Setters
    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public double getProgramPrice() {
        return programPrice;
    }

    public void setProgramPrice(double programPrice) {
        this.programPrice = programPrice;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
