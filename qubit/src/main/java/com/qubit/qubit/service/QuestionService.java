package com.qubit.qubit.service;

import com.qubit.qubit.entity.QuestionEntity;
import com.qubit.qubit.entity.TagEntity;
import com.qubit.qubit.entity.UserEntity;
import com.qubit.qubit.model.Tag;
import com.qubit.qubit.model.User;
import com.qubit.qubit.model.request.QuestionRequest;
import com.qubit.qubit.model.request.TagRequest;
import com.qubit.qubit.model.response.AnswerResponse;
import com.qubit.qubit.model.response.QuestionResponse;
import com.qubit.qubit.repository.QuestionRepository;
import com.qubit.qubit.repository.TagRepository;
import com.qubit.qubit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final TagService tagService;

    @Transactional
    public QuestionResponse createQuestion(QuestionRequest request) {
        System.out.println("Create Question Request: "+request);
        UserEntity author = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<TagEntity> tags = Optional.ofNullable(request.getTags())
                .orElse(Collections.emptyList())
                .stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> {
                            TagRequest tagRequest = new TagRequest();
                            tagRequest.setName(tagName);
                            tagService.createTag(tagRequest);
                            return tagRepository.findByName(tagName)
                                    .orElseThrow(() -> new RuntimeException("Failed to create tag: " + tagName));
                        }))
                .collect(Collectors.toSet());

        QuestionEntity question = new QuestionEntity();
        question.setTitle(request.getTitle());
        question.setDescription(request.getDescription());
        question.setTags(tags);
        question.setAuthor(author);
        question.setUpdateDateTime(new Date());
        tags.forEach(tag -> tag.getQuestions().add(question));

        author.addQuestion(question);
        return mapToResponse(questionRepository.save(question));
    }

    @Transactional(readOnly = true)
    public QuestionResponse getQuestion(Long id) {
        QuestionEntity question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        question.setTags(question.getTags());
        return mapToResponse(question);
    }

    @Transactional
    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAllWithTags().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Transactional
    public QuestionResponse updateQuestion(Long id, QuestionRequest request) {
        QuestionEntity question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Set<TagEntity> tags = Optional.ofNullable(request.getTags())
                .orElse(Collections.emptyList())
                .stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> {
                            TagRequest tagRequest = new TagRequest();
                            tagRequest.setName(tagName);
                            tagService.createTag(tagRequest);
                            return tagRepository.findByName(tagName)
                                    .orElseThrow(() -> new RuntimeException("Failed to create tag: " + tagName));
                        }))
                .collect(Collectors.toSet());

        question.setTitle(request.getTitle());
        question.setDescription(request.getDescription());
        question.setTags(tags);
        question.setUpdateDateTime(new Date());

        return mapToResponse(questionRepository.save(question));
    }
    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        questionRepository.deleteQuestionTagsRelations(id);

        questionRepository.deleteById(id);
    }

    @Transactional
    public List<QuestionResponse> getAllQuestionsByTag(Long tagId){
        List<QuestionResponse> questions = questionRepository.getAllQuestionsByTag(tagId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        if (questions.isEmpty()) {
            tagService.deleteTag(tagId);
        }

        return questions;
    }
    @Transactional
    public List<QuestionResponse> getQuestionsByTitleContaining(String keyword){
        return questionRepository.findByTitleContaining(keyword).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionResponse> getUnansweredQuestions(){
        return questionRepository.findQuestionsWithoutAnswers().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private QuestionResponse mapToResponse(QuestionEntity entity) {
        QuestionResponse response = new QuestionResponse();
        response.setQuestionId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setDescription(entity.getDescription());
        response.setTags(entity.getTags().stream()
                .map(this::mapToTag)
                .collect(Collectors.toSet()));
        if(entity.getAuthor() != null){
            User user = new User();
            user.setUsername(entity.getAuthor().getUsername());
            user.setUserId(entity.getAuthor().getId());
            user.setAvatar(entity.getAuthor().getAvatar());
            user.setEmail(entity.getAuthor().getEmail());
            response.setAuthor(user);
        }
        if(entity.getAnswers() != null){
            response.setAnswers(entity.getAnswers().stream()
                    .map(answerEntity -> {
                        AnswerResponse answerResponse = new AnswerResponse();
                        answerResponse.setAnswerId(answerEntity.getId());
                        answerResponse.setContent(answerEntity.getContent());
                        answerResponse.setQuestionId(answerEntity.getQuestion().getId());
                        answerResponse.setAuthor(mapToUser(answerEntity.getAuthor()));
                        answerResponse.setUpVotes(answerEntity.getUpVotes());
                        answerResponse.setUpdatedDateTime(new Date());
                        return answerResponse;
                    }).sorted(Comparator.comparing(AnswerResponse::getUpVotes).reversed())
                    .collect(Collectors.toCollection(LinkedHashSet::new)));
        }
        response.setUpdatedDateTime(new Date());
        return response;
    }

    private Tag mapToTag(TagEntity entity) {
        Tag tag = new Tag();
        tag.setTagId(entity.getId());
        tag.setName(entity.getName());
        return tag;
    }

    private User mapToUser(UserEntity entity) {
        User user = new User();
        user.setUserId(entity.getId());
        user.setUsername(entity.getUsername());
        user.setEmail(entity.getEmail());
        user.setAvatar(entity.getAvatar());
        return user;
    }
}
