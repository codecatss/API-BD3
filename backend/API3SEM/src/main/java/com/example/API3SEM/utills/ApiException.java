package com.example.API3SEM.utills;

public class ApiException extends RuntimeException {

    private final String message;

    public ApiException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
