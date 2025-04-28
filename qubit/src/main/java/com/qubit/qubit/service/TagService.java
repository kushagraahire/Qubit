package com.qubit.qubit.service;

import com.qubit.qubit.entity.TagEntity;
import com.qubit.qubit.model.request.TagRequest;
import com.qubit.qubit.model.response.TagResponse;
import com.qubit.qubit.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    @Transactional
    public TagResponse createTag(TagRequest request) {
        TagEntity existingTag = tagRepository.findByName(request.getName()).orElse(null);
        if(Objects.nonNull(existingTag)){
            throw new RuntimeException("Tag already exists");
        }
        TagEntity tag = new TagEntity();
        tag.setName(request.getName().toUpperCase());
        return mapToResponse(tagRepository.save(tag));
    }
    @Transactional
    public TagResponse getTag(Long id) {
        return mapToResponse(tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found")));
    }
    @Transactional
    public List<TagResponse> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Transactional
    public TagResponse updateTag(Long id, TagRequest request) {
        TagEntity existingTag = tagRepository.findByName(request.getName()).orElse(null);
        if(Objects.nonNull(existingTag)){
            throw new RuntimeException("Tag already exists");
        }
        TagEntity tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        tag.setName(request.getName().toUpperCase());
        return mapToResponse(tagRepository.save(tag));
    }
    @Transactional
    public void deleteTag(Long id) {
        TagEntity tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
        tagRepository.deleteQuestionTagsRelations(id);
        tagRepository.deleteById(id);
    }


    private TagResponse mapToResponse(TagEntity entity) {
        TagResponse response = new TagResponse();
        response.setTagId(entity.getId());
        response.setName(entity.getName());
        return response;
    }
}
