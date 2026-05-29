package com.PratikC54.NanoURL.dto;

import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Data
public class UrlMappingDTO {
    private Long id;

    @Column(length = 500)
    private String originalurl;
    private String shorturl;
    private int clickCount;
    private LocalDateTime dateTime;
    private String username;
}
