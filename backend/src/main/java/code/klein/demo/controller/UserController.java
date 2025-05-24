package code.klein.demo.controller;

import code.klein.demo.DTO.UserDto;
import code.klein.demo.DTO.UserMapper;
import code.klein.demo.entity.User;
import code.klein.demo.request.CreateUserRequest;
import code.klein.demo.request.UpdateUserRequest;
import code.klein.demo.request.UpdateUserRoleRequest;
import code.klein.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
public class UserController {

    @Autowired
    private UserService userService;

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
        return ResponseEntity.ok(UserMapper.toDto(user));
    }
}
