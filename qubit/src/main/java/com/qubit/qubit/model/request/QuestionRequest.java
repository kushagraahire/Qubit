package com.qubit.qubit.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    @NotNull
    private String title;
    @NotNull
    private String description;
    private List<String> tags;
    @NotNull
    private Long userId;
}
