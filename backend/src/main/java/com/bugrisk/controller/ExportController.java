package com.bugrisk.controller;

import com.bugrisk.entity.Rule;
import com.bugrisk.entity.ModuleRisk;
import com.bugrisk.entity.AuditLog;
import com.bugrisk.repository.RuleRepository;
import com.bugrisk.repository.ModuleRiskRepository;
import com.bugrisk.repository.AuditLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/export")
@CrossOrigin(originPatterns = "*")
@Slf4j
public class ExportController {

    private final RuleRepository ruleRepository;
    private final ModuleRiskRepository moduleRiskRepository;
    private final AuditLogRepository auditLogRepository;

    @Autowired
    public ExportController(RuleRepository ruleRepository,
                            ModuleRiskRepository moduleRiskRepository,
                            AuditLogRepository auditLogRepository) {
        this.ruleRepository = ruleRepository;
        this.moduleRiskRepository = moduleRiskRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping("/rules/csv")
    public ResponseEntity<byte[]> exportRulesCsv() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("User {} triggered rules CSV export", username);

        List<Rule> rules = ruleRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("id,antecedent,consequent,support,confidence,lift,created_at\n");

        for (Rule r : rules) {
            csv.append(r.getId()).append(",")
               .append("\"").append(r.getAntecedent().replace("\"", "\"\"")).append("\",")
               .append("\"").append(r.getConsequent().replace("\"", "\"\"")).append("\",")
               .append(r.getSupport()).append(",")
               .append(r.getConfidence()).append(",")
               .append(r.getLift()).append(",")
               .append(r.getCreatedAt()).append("\n");
        }

        byte[] data = csv.toString().getBytes();

        auditLogRepository.save(AuditLog.builder()
                .username(username)
                .action("EXPORT_RULES")
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=bugrisk_rules.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(data);
    }

    @GetMapping("/risk/csv")
    public ResponseEntity<byte[]> exportRiskCsv() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("User {} triggered module risk CSV export", username);

        List<ModuleRisk> risks = moduleRiskRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("id,module,risk_score,risk_level,top_rules_summary,created_at\n");

        for (ModuleRisk mr : risks) {
            csv.append(mr.getId()).append(",")
               .append("\"").append(mr.getModule().replace("\"", "\"\"")).append("\",")
               .append(mr.getRiskScore()).append(",")
               .append("\"").append(mr.getRiskLevel().replace("\"", "\"\"")).append("\",")
               .append("\"").append(mr.getTopRulesSummary() != null ? mr.getTopRulesSummary().replace("\"", "\"\"") : "").append("\",")
               .append(mr.getCreatedAt()).append("\n");
        }

        byte[] data = csv.toString().getBytes();

        auditLogRepository.save(AuditLog.builder()
                .username(username)
                .action("EXPORT_RISKS")
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=bugrisk_module_risks.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(data);
    }
}
