package code.klein.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:5173"})
public class AntiQueApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntiQueApplication.class, args);
    }

}
