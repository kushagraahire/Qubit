package com.qubit.qubit.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;


    private String password;

    private String avatar;
}
