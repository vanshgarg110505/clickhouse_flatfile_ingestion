package com.clickhouse.ingestion.controller;

import com.clickhouse.ingestion.model.ClickHouseConfig;
import com.clickhouse.ingestion.model.FlatFileConfig;
import com.clickhouse.ingestion.service.ClickHouseService;
import com.clickhouse.ingestion.service.FlatFileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ingestion")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class IngestionController {

    private final ClickHouseService clickHouseService;
    private final FlatFileService flatFileService;

    @PostMapping("/clickhouse/tables")
    public ResponseEntity<List<String>> getClickHouseTables(@Valid @RequestBody ClickHouseConfig config) {
        try {
            List<String> tables = clickHouseService.getTables(config);
            return ResponseEntity.ok(tables);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/clickhouse/columns")
    public ResponseEntity<List<String>> getClickHouseColumns(@Valid @RequestBody ClickHouseConfig config) {
        try {
            List<String> columns = clickHouseService.getColumns(config);
            return ResponseEntity.ok(columns);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/clickhouse/export")
    public ResponseEntity<Map<String, Long>> exportFromClickHouse(
            @Valid @RequestBody ClickHouseConfig config,
            @RequestParam String[] columns) {
        try {
            long count = clickHouseService.exportData(config, columns);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/clickhouse/import")
    public ResponseEntity<Map<String, Long>> importToClickHouse(
            @Valid @RequestBody ClickHouseConfig config,
            @RequestParam String[] columns,
            @RequestBody String data) {
        try {
            long count = clickHouseService.importData(config, columns, data);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/flatfile/headers")
    public ResponseEntity<List<String>> getFlatFileHeaders(@Valid @RequestBody FlatFileConfig config) {
        try {
            List<String> headers = flatFileService.getHeaders(config);
            return ResponseEntity.ok(headers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/flatfile/preview")
    public ResponseEntity<List<List<String>>> previewFlatFile(
            @Valid @RequestBody FlatFileConfig config,
            @RequestParam(defaultValue = "100") int limit) {
        try {
            List<List<String>> preview = flatFileService.previewData(config, limit);
            return ResponseEntity.ok(preview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/flatfile/process")
    public ResponseEntity<Map<String, Long>> processFlatFile(@Valid @RequestBody FlatFileConfig config) {
        try {
            long count = flatFileService.processFile(config);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 