package com.accolite.server.exceptions;

public class EmailNotFoundException extends RuntimeException{
    public EmailNotFoundException(String msg) {
        super(msg);
    }
}