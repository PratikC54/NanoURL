package com.PratikC54.NanoURL.service;

import com.PratikC54.NanoURL.dto.UrlMappingDTO;
import com.PratikC54.NanoURL.models.UrlMapping;
import com.PratikC54.NanoURL.models.User;
import com.PratikC54.NanoURL.repository.UrlMappingRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UrlMappingService {
    private final UrlMappingRepository urlMappingRepository;

    public @Nullable UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setShortUrl(shortUrl);
        UrlMapping savedUrlMapping =urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    private String generateUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(7);
        for (int i=0;i<7;i++)
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        return shortUrl.toString();
    }

    public UrlMappingDTO convertToDto(UrlMapping urlMapping) {
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalurl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShorturl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        urlMappingDTO.setDateTime(urlMapping.getCreatedDate());
        return urlMappingDTO;
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }
}
