package com.qubit.qubit.controller;

import com.qubit.qubit.model.request.AnswerRequest;
import com.qubit.qubit.model.request.UpdateUpvoteRequest;
import com.qubit.qubit.model.response.AnswerResponse;
import com.qubit.qubit.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    @PostMapping("/create")
    public ResponseEntity<AnswerResponse> createAnswer(@RequestBody AnswerRequest request){
        return ResponseEntity.ok(answerService.createAnswer(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnswerResponse> getAnswer(@PathVariable Long id) {
        return ResponseEntity.ok(answerService.getAnswer(id));
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<AnswerResponse>> getAnswersByQuestion(@PathVariable Long questionId) {
        return ResponseEntity.ok(answerService.getAnswersByQuestion(questionId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnswerResponse> updateAnswer(@PathVariable Long id, @RequestBody AnswerRequest request) {
        return ResponseEntity.ok(answerService.updateAnswer(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-upvote")
    public ResponseEntity<AnswerResponse> updateUpvote(@RequestBody UpdateUpvoteRequest updateUpvoteRequest) {
        return ResponseEntity.ok(answerService.updateUpvote(updateUpvoteRequest.getAnswerId(), updateUpvoteRequest.getUserId(), updateUpvoteRequest.getAction()));
    }
}
