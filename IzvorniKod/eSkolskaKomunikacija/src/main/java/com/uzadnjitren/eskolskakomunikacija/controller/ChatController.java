package com.uzadnjitren.eskolskakomunikacija.controller;
import com.uzadnjitren.eskolskakomunikacija.service.StreamChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/chat")
public class ChatController {
    private final StreamChatService streamChatService;

    public ChatController(StreamChatService streamChatService) {
        this.streamChatService = streamChatService;
    }

    @GetMapping("/token/{userId}")
    public ResponseEntity<Map<String, String>> getToken(@PathVariable String userId) {
        String token = streamChatService.generateToken(userId);

        Map<String, String> response = new HashMap<>();
        response.put("data", token);

        return ResponseEntity.ok(response);
    }
}
