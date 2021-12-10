package com.inqhome.infra.exceptions;

public class ValidationException extends RuntimeException {

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(String format, Object... args) {
        super(String.format(format, args));
    }

}
