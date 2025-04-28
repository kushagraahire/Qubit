package com.qubit.qubit.controller;

import com.qubit.qubit.entity.UserEntity;
import com.qubit.qubit.model.request.LoginRequest;
import com.qubit.qubit.model.request.UpdateUserRequest;
import com.qubit.qubit.model.request.UserRequest;
import com.qubit.qubit.model.response.UserResponse;
import com.qubit.qubit.repository.UserRepository;
import com.qubit.qubit.service.UserService;
import com.qubit.qubit.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserResponse> getCurrentUser(@RequestHeader("Authorization") String token) {
        String email = jwtUtils.getUsername(token.replace("Bearer ", ""));
        return ResponseEntity.ok(userService.getCurrentUser(email));
    }

    @GetMapping("/top-contributors")
    public ResponseEntity<List<UserResponse>> getTopContributors(){
        return ResponseEntity.ok(userService.getTopContributors());
    }
}
