package com.tek.rms.exceptions;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(int project_id) {

        super("Could not found the user with id " + project_id);
    }
}
