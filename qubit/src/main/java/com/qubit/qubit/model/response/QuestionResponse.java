package com.qubit.qubit.model.response;

import com.qubit.qubit.model.Tag;
import com.qubit.qubit.model.User;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class QuestionResponse {
    private Long questionId;
    private String title;
    private String description;
    private Set<Tag> tags;
    private Set<AnswerResponse> answers;
    private User author;
    private Date updatedDateTime;
}
