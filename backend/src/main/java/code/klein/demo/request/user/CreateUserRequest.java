package code.klein.demo.request.user;

import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CreateUserRequest(
        String username,
        String email,
        String firstName,
        String lastName,
        String street,
        String city,
        String postalCode,
        String country,
        LocalDate birthDate,
        @Nullable Long companyId
        ) {}
