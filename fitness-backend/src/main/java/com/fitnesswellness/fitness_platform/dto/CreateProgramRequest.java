package com.fitnesswellness.fitness_platform.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateProgramRequest {

    private String name;

    @NotBlank
    private String description;

    @NotNull
    @Min(0)
    private double price;

    @NotNull
    private Long trainer;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Long getTrainer() {
        return trainer;
    }

    public void setTrainer(Long trainer_id) {
        this.trainer = trainer_id;
    }

    // Getters and Setters
}
