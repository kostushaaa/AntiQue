package code.klein.demo.controller;

import code.klein.demo.entity.User;
import code.klein.demo.request.CreateUserRequest;
import code.klein.demo.request.UpdateUserRequest;
import code.klein.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody UpdateUserRequest request) {
        User user = userService.updateUser(request);
        return ResponseEntity.ok(user);
    }
}
