package code.klein.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actor; // wer hat es getan

    private String action; // z. B. "RESET_PASSWORD", "DELETE_USER", ...

    private String target; // optional: auf wen/welches Objekt bezogen

    @CreationTimestamp
    private LocalDateTime timestamp;
}