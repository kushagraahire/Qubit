package com.qubit.qubit.model.response;

import com.qubit.qubit.model.Question;
import lombok.Data;

import java.util.Set;

@Data
public class TagResponse {
    private Long tagId;
    private String name;
}
