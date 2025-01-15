package com.uzadnjitren.eskolskakomunikacija.controller;

import java.util.List;

public class ObavijestRequest {
    private List<String> classes; // Updated to match frontend
    private String subject;
    private String description;

    // Getters and setters
    public List<String> getClasses() {
        return classes;
    }

    public void setClasses(List<String> classes) {
        this.classes = classes;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
