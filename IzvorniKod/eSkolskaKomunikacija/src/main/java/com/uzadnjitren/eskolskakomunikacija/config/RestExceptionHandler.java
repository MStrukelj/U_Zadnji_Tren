package com.uzadnjitren.eskolskakomunikacija.config;

import com.uzadnjitren.eskolskakomunikacija.exception.KorisnikCRUDException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = {KorisnikCRUDException.class})
    @ResponseBody
    public ResponseEntity<?> handleException(KorisnikCRUDException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}
