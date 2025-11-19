package com.assignment.dto;

import jakarta.validation.constraints.Size;

public class UpdateTodoRequest {
    @Size(max = 100, message = "title can be at most 100 characters")
    private String title;

    @Size(max = 500, message = "description can be at most 500 characters")
    private String description;

    private Boolean completed;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
