package code.klein.demo.controller;

import code.klein.demo.DTO.UserDto;
import code.klein.demo.DTO.UserMapper;
import code.klein.demo.entity.User;
import code.klein.demo.request.CreateUserRequest;
import code.klein.demo.request.UpdateUserRequest;
import code.klein.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
