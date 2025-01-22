package com.uzadnjitren.eskolskakomunikacija.service;
import io.getstream.chat.java.models.User;
import org.springframework.stereotype.Service;

@Service
public class StreamChatService {
    public String generateToken(String userId) {
        return User.createToken(userId,null,null);
    }

}
