package com.accolite.server.Exceptions;

public class EmailNotFoundException extends RuntimeException{
    public EmailNotFoundException(String msg) {
        super(msg);
    }
}