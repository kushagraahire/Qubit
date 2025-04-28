package com.qubit.qubit.repository;

import com.qubit.qubit.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
    Optional<TagEntity> findByName(String name);

    @Modifying
    @Query(value = "DELETE FROM question_tags WHERE tag_id = :tagId", nativeQuery = true)
    void deleteQuestionTagsRelations(@Param("tagId") Long tagId);
}
