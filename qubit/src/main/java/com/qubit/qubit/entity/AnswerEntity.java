package com.qubit.qubit.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "answers")
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String content;
    @ManyToOne(optional = false)
    @JoinColumn(name = "question_id")
    private QuestionEntity question;
    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    private UserEntity author;
    private int upVotes;
    @Column(nullable = false)
    private Date updatedDateTime;
}
