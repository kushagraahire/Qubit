package com.qubit.qubit.model;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class Question {
    private Long questionId;
    private String title;
    private String description;
    private Set<Tag> tags;
    private User author;
    private Date updatedDateTime;
}
