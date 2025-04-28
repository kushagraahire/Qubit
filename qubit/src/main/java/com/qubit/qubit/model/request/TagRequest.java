package com.qubit.qubit.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TagRequest {
    @NotNull
    private String name;
}
