package com.qubit.qubit.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerRequest {
    @NotNull
    private String content;
    @NotNull
    private Long questionId;
    @NotNull
    private Long userId;
    private int upVotes;
}
