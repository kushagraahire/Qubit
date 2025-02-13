package com.qubit.qubit.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Answer")
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;
    private String content;
    @ManyToOne
    @JoinColumn(name = "questionId")
    private QuestionEntity question;
    @ManyToOne
    private UserEntity author;
    private int upVotes;
}
