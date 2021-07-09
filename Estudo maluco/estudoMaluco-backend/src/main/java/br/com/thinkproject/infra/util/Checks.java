package br.com.thinkproject.infra.util;

import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validation;
import javax.validation.ValidationException;
import javax.validation.Validator;

public class Checks {

    private Checks() {
    }

    public static void checkValidation(boolean expression, String message) {
        if (!expression) {
            throw new ValidationException(message);
        }
    }

    public static void checkConstraints(Object obj) {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Object>> violations = validator.validate(obj);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

    public static void checkArgument(boolean expression) {
        if (!expression) {
            throw new IllegalArgumentException();
        }
    }

    public static void checkArgument(boolean expression, String message) {
        if (!expression) {
            throw new IllegalArgumentException(message);
        }
    }

    public static void checkNotNull(Object obj) {
        if (obj == null) {
            throw new NullPointerException();
        }
    }

    public static void checkNotNull(Object obj, String message) {
        if (obj == null) {
            throw new NullPointerException(message);
        }
    }

    public static void checkState(boolean expression) {
        if (!expression) {
            throw new IllegalStateException();
        }
    }

    public static void checkState(boolean expression, String message) {
        if (!expression) {
            throw new IllegalStateException(message);
        }
    }
}
