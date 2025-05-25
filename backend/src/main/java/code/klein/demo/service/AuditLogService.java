package code.klein.demo.service;

import code.klein.demo.entity.AuditLog;
import code.klein.demo.repository.AuditLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;


    @Transactional
    public void log(String actor, String action, String target) {
        AuditLog log = AuditLog.builder()
                .actor(actor)
                .action(action)
                .target(target)
                .build();
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }
}