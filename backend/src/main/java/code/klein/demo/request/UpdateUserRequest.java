package code.klein.demo.request;

public record UpdateUserRequest(String lastUsername, String lastEmail, String username, String email) {}
