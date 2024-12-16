package com.fitnesswellness.fitness_platform.dto;

import jakarta.validation.constraints.NotNull;

public class UpdateBookingRequest {

    @NotNull
    private Long customerId;

    @NotNull
    private Long programId;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }
}
