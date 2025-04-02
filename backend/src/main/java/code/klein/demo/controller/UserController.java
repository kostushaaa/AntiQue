package code.klein.demo.controller;

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
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequest request) {
        userService.createUser(request.username(), request.email());
        return ResponseEntity.ok("User created");
    }

    @PostMapping("users/update")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserRequest request) {
        userService.updateUser(request.lastUsername(), request.lastEmail(), request.username(), request.email());
        return ResponseEntity.ok("User updated");
    }

}
