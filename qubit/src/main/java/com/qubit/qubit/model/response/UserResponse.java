package com.qubit.qubit.model.response;

import com.qubit.qubit.model.Answer;
import com.qubit.qubit.model.Question;
import lombok.Data;

import java.util.Set;

@Data
public class UserResponse {
    private Long userId;
    private String username;
    private String email;
    private String avatar;
    private Set<Question> questions;
    private Set<Answer> answers;
    private Set<Long> upvoteAnswers;
}
