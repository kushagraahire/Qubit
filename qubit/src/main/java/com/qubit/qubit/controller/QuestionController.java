package com.qubit.qubit.controller;

import com.qubit.qubit.model.request.QuestionRequest;
import com.qubit.qubit.model.response.QuestionResponse;
import com.qubit.qubit.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/create")
    public ResponseEntity<QuestionResponse> createQuestion(@RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.createQuestion(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestion(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionResponse> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<QuestionResponse>> getAllQuestionsByTag(@PathVariable Long tagId) {
        return ResponseEntity.ok(questionService.getAllQuestionsByTag(tagId));
    }

    @GetMapping("/title/{keyword}")
    public ResponseEntity<List<QuestionResponse>> getQuestionByTitleContaining(@PathVariable String keyword){
        return ResponseEntity.ok(questionService.getQuestionsByTitleContaining(keyword));
    }

    @GetMapping("/unanswered-question")
    public ResponseEntity<List<QuestionResponse>> getUnansweredQuestions(){
        return ResponseEntity.ok(questionService.getUnansweredQuestions());
    }
}
