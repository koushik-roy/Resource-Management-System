package com.tek.rms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CustomerApiException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public CustomerApiException(String message){
        super(message);
    }

}