package com.bugrisk.repository;

import com.bugrisk.entity.ModuleRisk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.cache.annotation.Cacheable;
import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRiskRepository extends JpaRepository<ModuleRisk, Long> {
    Optional<ModuleRisk> findByModule(String module);
    List<ModuleRisk> findByRiskLevel(String riskLevel);

    @Cacheable(value = "risks", key = "{#module, #riskLevel}")
    @Query("SELECT mr FROM ModuleRisk mr WHERE " +
           "(:module IS NULL OR LOWER(mr.module) LIKE %:module%) AND " +
           "(:riskLevel IS NULL OR mr.riskLevel = :riskLevel)")
    List<ModuleRisk> searchModuleRisks(
        @Param("module") String module,
        @Param("riskLevel") String riskLevel
    );
}
