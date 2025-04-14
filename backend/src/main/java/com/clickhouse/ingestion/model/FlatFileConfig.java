package com.clickhouse.ingestion.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FlatFileConfig {
    @NotBlank(message = "File is required")
    private MultipartFile file;
    
    @NotBlank(message = "Delimiter is required")
    private String delimiter;
    
    private String[] selectedColumns;
} 