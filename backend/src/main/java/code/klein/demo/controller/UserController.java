package code.klein.demo.controller;

import code.klein.demo.DTO.UserDto;
import code.klein.demo.DTO.UserMapper;
import code.klein.demo.entity.User;
import code.klein.demo.request.CreateUserRequest;
import code.klein.demo.request.ResetPasswordRequest;
import code.klein.demo.request.UpdateUserRequest;
import code.klein.demo.request.UpdateUserRoleRequest;
import code.klein.demo.service.AuditLogService;
import code.klein.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.security.authorization.AuthorityReactiveAuthorizationManager.hasRole;

@RestController()
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuditLogService auditLogService;


    @PostMapping("users/create")
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest request) {
        User createdUser = userService.createUser(request.username(), request.email());
        return ResponseEntity.ok(UserMapper.toDto(createdUser));
    }

    @PostMapping("users/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUser(
                request.lastUsername(), request.lastEmail(),
                request.username(), request.email()
        );
        return ResponseEntity.ok(UserMapper.toDto(updatedUser));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDto> userDtos = users.stream()
                .map(UserMapper::toDto)
                .toList();
        return ResponseEntity.ok(userDtos);
    }

    @PostMapping("/admin/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUserRole(@RequestBody UpdateUserRoleRequest request) {
        User user = userService.updateUserRole(request.username(), request.role());

        auditLogService.log(
                getCurrentUsername(),
                "ROLE_CHANGED",
                "Changed role of user %s to %s".formatted(request.username(), request.role())
        );

        return ResponseEntity.ok(UserMapper.toDto(user));
    }

    @DeleteMapping("/admin/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        userService.deleteUserByUsername(username);

        auditLogService.log(
                getCurrentUsername(),
                "USER_DELETED",
                "Deleted user: %s".formatted(username)
        );

        return ResponseEntity.ok("User deleted: " + username);
    }

    @PostMapping("/admin/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.username(), request.newPassword());

        auditLogService.log(
                getCurrentUsername(),
                "PASSWORD_RESET",
                "Reset password for user %s".formatted(request.username())
        );

        return ResponseEntity.ok("Password updated for user: " + request.username());
    }

    @GetMapping("/admin/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Set<String>> getUserRoles(@RequestParam String username) {
        Set<String> roles = userService.getUserRoles(username);
        return ResponseEntity.ok(roles);
    }

    private String getCurrentUsername() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "UNKNOWN";
    }



}
