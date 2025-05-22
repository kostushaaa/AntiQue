package code.klein.demo.entity;

import code.klein.demo.config.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Data
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, updatable = false)
    private String uuid = UUID.randomUUID().toString();


    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_authorities",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "authorities")
    @Enumerated(EnumType.STRING)
    private Set<Role> authorities = new HashSet<>();

    private boolean accountNonExpired;
    private boolean isEnabled;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;

}
