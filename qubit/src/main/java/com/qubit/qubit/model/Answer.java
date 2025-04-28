package com.qubit.qubit.model;

import com.qubit.qubit.entity.QuestionEntity;
import com.qubit.qubit.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
public class Answer {
    private Long id;
    private String content;
    private String questionTitle;
    private Long questionId;
    private int upVotes;
    private Date updatedDateTime;
}
