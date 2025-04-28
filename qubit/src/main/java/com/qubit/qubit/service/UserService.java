package com.qubit.qubit.service;

import com.qubit.qubit.entity.UserEntity;
import com.qubit.qubit.model.Answer;
import com.qubit.qubit.model.Question;
import com.qubit.qubit.model.request.LoginRequest;
import com.qubit.qubit.model.request.UpdateUserRequest;
import com.qubit.qubit.model.request.UserRequest;
import com.qubit.qubit.model.response.UserResponse;
import com.qubit.qubit.repository.UserRepository;
import com.qubit.qubit.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    public static final String DEFAULT_IMAGE = "https://www.gravatar.com/avatar/?d=mp";
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    @Transactional
    public UserResponse createUser(UserRequest request) {
        UserEntity existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(Objects.nonNull(existingUser)){
            throw new RuntimeException("User already exists with the given email");
        }
        if(request.getPassword() == null || request.getPassword().isBlank()){
            throw new RuntimeException("Password cannot be empty");
        }
        UserEntity user = new UserEntity();
        user.setAvatar(DEFAULT_IMAGE);
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAvatar(request.getAvatar());

        return mapToResponse(userRepository.save(user));
    }
    @Transactional
    public UserResponse getUser(Long id) {
        return mapToResponse(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }
    @Transactional
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<UserResponse> getTopContributors() {
        return userRepository.getTopContributors(PageRequest.of(0,10)).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(request.getUsername() != null){
            user.setUsername(request.getUsername());
        }
        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());
        }
        if(request.getAvatar() != null && !request.getAvatar().isBlank()){
            user.setAvatar(request.getAvatar());
        }

        return mapToResponse(userRepository.save(user));
    }
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public String login(LoginRequest loginRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        UserDetails userDetails = userDetailService.loadUserByUsername(loginRequest.getEmail());
        return jwtUtils.generateToken(userDetails.getUsername());
    }

    private UserResponse mapToResponse(UserEntity entity) {
        UserResponse response = new UserResponse();
        response.setUserId(entity.getId());
        response.setUsername(entity.getUsername());
        response.setEmail(entity.getEmail());
        response.setAvatar(entity.getAvatar());

        if (entity.getQuestions() != null) {
            response.setQuestions(entity.getQuestions().stream()
                    .map(questionEntity -> {
                        Question question = new Question();
                        question.setQuestionId(questionEntity.getId());
                        question.setTitle(questionEntity.getTitle());
                        question.setDescription(questionEntity.getDescription());
                        question.setUpdatedDateTime(questionEntity.getUpdateDateTime());
                        return question;
                    })
                    .collect(Collectors.toSet()));
        }

        if(entity.getAnswers() != null){
            response.setAnswers(entity.getAnswers().stream()
                    .map(answerEntity -> {
                        Answer answer = new Answer();
                        answer.setId(answerEntity.getId());
                        answer.setContent(answerEntity.getContent());
                        answer.setUpVotes(answer.getUpVotes());
                        answer.setQuestionId(answerEntity.getQuestion().getId());
                        answer.setQuestionTitle(answerEntity.getQuestion().getTitle());
                        answer.setUpdatedDateTime(answerEntity.getUpdatedDateTime());
                        return answer;
                    }).collect(Collectors.toSet()));
        }

        if(entity.getUpvoteAnswers() != null){
            response.setUpvoteAnswers(entity.getUpvoteAnswers());
        }

        return response;
    }

    public UserResponse getCurrentUser(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }
}
