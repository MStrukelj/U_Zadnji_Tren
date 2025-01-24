package com.uzadnjitren.eskolskakomunikacija.controller;
import com.uzadnjitren.eskolskakomunikacija.service.StreamChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/{userId}")
    public ResponseEntity<String> upsertUser(@PathVariable String userId) {
        try {
            streamChatService.upsertUser(userId);
            return ResponseEntity.ok("User " + userId + " has been upserted.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error upserting user: " + e.getMessage());
        }
    }
}
