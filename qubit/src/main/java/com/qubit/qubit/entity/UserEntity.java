package com.qubit.qubit.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;
@Data
@Entity
@Table(name = "User")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;
    private String password;
    @OneToMany(mappedBy = "author")
    private Set<QuestionEntity> questions;
    @OneToMany(mappedBy = "author")
    private Set<AnswerEntity> answers;
}
