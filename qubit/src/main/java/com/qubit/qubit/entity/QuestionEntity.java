package com.qubit.qubit.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;
@Data
@Entity
@Table(name = "Question")
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    private String title;
    private String description;
    @ManyToMany
    private Set<TagEntity> tags;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<AnswerEntity> answers;
    @ManyToOne
    private UserEntity author;
    private int upVotes;

}
