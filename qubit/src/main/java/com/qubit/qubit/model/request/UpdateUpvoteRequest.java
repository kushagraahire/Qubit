package com.qubit.qubit.model.request;

import lombok.Data;

@Data
public class UpdateUpvoteRequest {
    Long answerId;
    Long userId;
    String action;
}
