package com.assignment.dto;

import jakarta.validation.constraints.Size;

public class UpdateStatus {
    private Boolean completed;

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
