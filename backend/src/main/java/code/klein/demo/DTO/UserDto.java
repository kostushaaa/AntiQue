package code.klein.demo.DTO;

import java.util.UUID;

public record UserDto(
        Long id,
        String uuid,
        String username,
        String email
) {}
