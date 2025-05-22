package code.klein.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "cars")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(name = "model_name", nullable = false)
    private String modelName;

    @Column(name = "price_per_day", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @Column(name = "price_per_km", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerKm;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)
    private CurrencyCode currency;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean available = true;

    public enum CurrencyCode {
        EUR, USD, UAH, RUB
    }
}