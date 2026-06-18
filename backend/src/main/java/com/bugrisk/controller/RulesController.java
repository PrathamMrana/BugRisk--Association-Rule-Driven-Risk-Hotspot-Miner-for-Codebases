package com.bugrisk.controller;

import com.bugrisk.entity.Rule;
import com.bugrisk.repository.RuleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rules")
@CrossOrigin(origins = "*")
@Slf4j
public class RulesController {

    private final RuleRepository ruleRepository;

    @Autowired
    public RulesController(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Rule>> getRules(
            @RequestParam(required = false) String module,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) Double support,
            @RequestParam(required = false) Double confidence,
            @RequestParam(required = false) Double lift,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "lift") String sortBy,
            @RequestParam(defaultValue = "true") boolean sortDesc
    ) {
        log.info("Received rules query: module={}, severity={}, support={}, confidence={}, lift={}, page={}, size={}",
                module, severity, support, confidence, lift, page, size);
        Sort sort = sortDesc ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Rule> rules = ruleRepository.searchRules(module, severity, support, confidence, lift, pageable);
        log.info("Found {} matching rules in PostgreSQL rules index", rules.getTotalElements());
        return ResponseEntity.ok(rules);
    }
}
