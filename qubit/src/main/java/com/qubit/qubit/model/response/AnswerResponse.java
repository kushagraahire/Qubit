package com.qubit.qubit.model.response;

import com.qubit.qubit.model.User;
import lombok.Data;

import java.util.Date;

@Data
public class AnswerResponse {
    private Long answerId;
    private String content;
    private Long questionId;
    private User author;
    private int upVotes;
    private Date updatedDateTime;
}
