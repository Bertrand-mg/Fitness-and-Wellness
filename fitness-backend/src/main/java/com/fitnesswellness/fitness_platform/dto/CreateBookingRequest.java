package com.fitnesswellness.fitness_platform.dto;

import jakarta.validation.constraints.NotNull;

public class CreateBookingRequest {

    @NotNull
    private String email;

    @NotNull
    private Long programId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

}
