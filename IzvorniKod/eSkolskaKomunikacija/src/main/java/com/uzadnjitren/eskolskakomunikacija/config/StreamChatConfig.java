package com.uzadnjitren.eskolskakomunikacija.config;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StreamChatConfig {

    @Value("${io.getstream.chat.apiKey}")
    private String apiKey;

    @Value("${io.getstream.chat.secretKey}")
    private String secretKey;

    @PostConstruct
    public void init() {
        System.setProperty("STREAM_KEY", apiKey);
        System.setProperty("STREAM_SECRET", secretKey);
    }

}

