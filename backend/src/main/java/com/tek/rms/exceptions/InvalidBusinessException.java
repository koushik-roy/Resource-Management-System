package com.tek.rms.exceptions;
import org.springframework.web.bind.annotation.ControllerAdvice;
public class InvalidBusinessException extends Exception {
    public InvalidBusinessException(String message) {
        super(message);
    }
}