package com.uzadnjitren.eskolskakomunikacija.service;
import io.getstream.chat.java.models.User;
import org.springframework.stereotype.Service;

@Service
public class StreamChatService {
    public String generateToken(String userId) {
        return User.createToken(userId,null,null);
    }

    public void upsertUser(String userId) {
        try {
            var user = User.UserRequestObject.builder().id(userId).build();
            User.upsert().user(user).request();
        } catch (Exception e) {
            System.err.println("Error upserting user: " + e.getMessage());
        }
    }
}
