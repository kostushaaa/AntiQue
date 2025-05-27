package code.klein.demo.request;

import lombok.Getter;

@Getter
public class AuthenticationResponse {
    private final String jwt;
    private final String role;

    public AuthenticationResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = role;
    }

}