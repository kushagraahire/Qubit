package com.qubit.qubit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String avatar;
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<QuestionEntity> questions = new HashSet<>();
    @OneToMany(mappedBy = "author")
    private Set<AnswerEntity> answers;
    private Set<Long> upvoteAnswers = new HashSet<>();

    public void addQuestion(QuestionEntity question){
        questions.add(question);
        question.setAuthor(this);
    }
}
