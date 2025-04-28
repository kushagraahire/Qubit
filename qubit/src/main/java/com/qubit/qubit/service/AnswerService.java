package com.qubit.qubit.service;

import com.qubit.qubit.entity.AnswerEntity;
import com.qubit.qubit.entity.QuestionEntity;
import com.qubit.qubit.entity.UserEntity;
import com.qubit.qubit.model.User;
import com.qubit.qubit.model.request.AnswerRequest;
import com.qubit.qubit.model.response.AnswerResponse;
import com.qubit.qubit.repository.AnswerRepository;
import com.qubit.qubit.repository.QuestionRepository;
import com.qubit.qubit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    @Transactional
    public AnswerResponse createAnswer(AnswerRequest request) {
        QuestionEntity question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        UserEntity author = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AnswerEntity answer = new AnswerEntity();
        answer.setContent(request.getContent());
        answer.setQuestion(question);
        answer.setAuthor(author);
        answer.setUpVotes(request.getUpVotes());
        answer.setUpdatedDateTime(new Date());
        question.addAnswer(answer);
        return mapToResponse(answerRepository.save(answer));
    }
    @Transactional
    public AnswerResponse getAnswer(Long id) {
        return mapToResponse(answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found")));
    }
    @Transactional
    public List<AnswerResponse> getAnswersByQuestion(Long questionId) {
        return answerRepository.findByQuestionId(questionId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Transactional
    public AnswerResponse updateAnswer(Long id, AnswerRequest request) {
        AnswerEntity answer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        answer.setContent(request.getContent());
        answer.setUpdatedDateTime(new Date());
        if(request.getUpVotes() != 0){
            answer.setUpVotes(request.getUpVotes());
        }

        return mapToResponse(answerRepository.save(answer));
    }
    @Transactional
    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }

    @Transactional
    public AnswerResponse updateUpvote(Long answerId, Long userId, String action){
        AnswerEntity answerEntity = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Long> upvotedAnswers = userEntity.getUpvoteAnswers();

        if ("INCREMENT".equalsIgnoreCase(action)) {
            if (!upvotedAnswers.add(answerId)) {
                throw new RuntimeException("Already upvoted");
            }
            answerEntity.setUpVotes(answerEntity.getUpVotes() + 1);
        } else if ("DECREMENT".equalsIgnoreCase(action)) {
            if (!upvotedAnswers.remove(answerId)) {
                throw new RuntimeException("Answer is not upvoted");
            }
            answerEntity.setUpVotes(answerEntity.getUpVotes() - 1);
        } else {
            throw new IllegalArgumentException("Invalid action");
        }

        userRepository.save(userEntity);
        return mapToResponse(answerRepository.save(answerEntity));
    }

    private AnswerResponse mapToResponse(AnswerEntity entity) {
        AnswerResponse response = new AnswerResponse();
        response.setAnswerId(entity.getId());
        response.setContent(entity.getContent());
        response.setQuestionId(entity.getQuestion().getId());
        response.setUpVotes(entity.getUpVotes());
        response.setAuthor(mapToUser(entity.getAuthor()));
        response.setUpdatedDateTime(entity.getUpdatedDateTime());
        return response;
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
