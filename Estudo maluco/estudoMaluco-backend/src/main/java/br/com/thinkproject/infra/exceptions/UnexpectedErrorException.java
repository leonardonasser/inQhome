package br.com.thinkproject.infra.exceptions;

public class UnexpectedErrorException extends RuntimeException {

    public UnexpectedErrorException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnexpectedErrorException(Throwable cause) {
        super(cause);
    }

    public UnexpectedErrorException(String message) {
        super(message);
    }

    public UnexpectedErrorException(String format, Object... args) {
        super(String.format(format, args));
    }

}
