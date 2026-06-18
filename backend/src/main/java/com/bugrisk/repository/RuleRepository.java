package com.bugrisk.repository;

import com.bugrisk.entity.Rule;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

    @Cacheable(value = "rules", key = "{#module, #severity, #support, #confidence, #lift, #pageable.pageNumber, #pageable.pageSize, #pageable.sort.toString()}")
    @Query("SELECT r FROM Rule r WHERE " +
           "(:module IS NULL OR r.antecedent LIKE %:module%) AND " +
           "(:severity IS NULL OR r.consequent LIKE %:severity%) AND " +
           "(:support IS NULL OR r.support >= :support) AND " +
           "(:confidence IS NULL OR r.confidence >= :confidence) AND " +
           "(:lift IS NULL OR r.lift >= :lift)")
    Page<Rule> searchRules(
        @Param("module") String module,
        @Param("severity") String severity,
        @Param("support") Double support,
        @Param("confidence") Double confidence,
        @Param("lift") Double lift,
        Pageable pageable
    );
}
