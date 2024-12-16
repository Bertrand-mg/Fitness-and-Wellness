package com.fitnesswellness.fitness_platform.dto;

import com.fitnesswellness.fitness_platform.model.Program;

public class ProgramDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String userName;

    // Constructor, Getters, Setters
    public ProgramDTO(Program program) {
        this.id = program.getId();
        this.name = program.getName();
        this.description = program.getDescription();
        this.price = program.getPrice();
        this.userName = program.getUser() != null ? program.getUser().getName() : null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    // Getters and Setters

}
