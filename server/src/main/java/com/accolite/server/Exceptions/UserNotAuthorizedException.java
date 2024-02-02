package com.accolite.server.exceptions;

public class UserNotAuthorizedException extends RuntimeException{
    public UserNotAuthorizedException(String msg) {
        super(msg);
    }
}