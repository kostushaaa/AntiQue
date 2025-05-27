package code.klein.demo;

import code.klein.demo.config.Role;
import code.klein.demo.entity.User;
import code.klein.demo.request.RegisterRequest;
import code.klein.demo.service.AuthenticationService;
import code.klein.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AntiQueApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntiQueApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthenticationService service,
            UserService userService) {
        return args -> {
            var admin = User.builder()
                    .username("admin")
                    .email("admin@mail.com")
                    .password("admin123")
                    .build();

            final var adminRequest = new RegisterRequest(admin.getUsername(), admin.getEmail() ,admin.getPassword());
            System.out.println("Admin: " + service.registerUser(adminRequest).toString());

            userService.updateUserRole(
                    admin.getUsername(), Role.ROLE_ADMIN.getAuthority()
            );

            var customer = User.builder()
                    .username("customer")
                    .email("customer@mail.com")
                    .password("customer123")
                    .build();

            final var customerRequest = new RegisterRequest(customer.getUsername(), customer.getEmail() ,customer.getPassword());
            System.out.println("Customer: " + service.registerUser(customerRequest).toString());
        };
    }
}
