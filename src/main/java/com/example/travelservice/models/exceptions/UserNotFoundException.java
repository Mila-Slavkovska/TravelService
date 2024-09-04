package com.example.travelservice.models.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String username){
        super(String.format("User with %s not found.", username));
    }
}
