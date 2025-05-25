package code.klein.demo.repository;

import code.klein.demo.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository  extends JpaRepository<AuditLog, Long> {
}
