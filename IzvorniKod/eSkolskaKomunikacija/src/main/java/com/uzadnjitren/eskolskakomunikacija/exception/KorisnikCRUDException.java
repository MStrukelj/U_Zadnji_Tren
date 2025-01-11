package com.uzadnjitren.eskolskakomunikacija.exception;

import org.springframework.http.HttpStatus;

public class KorisnikCRUDException extends RuntimeException {
    private final HttpStatus status;

    public KorisnikCRUDException(String message,HttpStatus status) {
        super(message);
        this.status = status;
    }
    public HttpStatus getStatus() {
        return status;
    }
}
