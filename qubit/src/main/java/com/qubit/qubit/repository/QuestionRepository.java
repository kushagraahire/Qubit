package com.qubit.qubit.repository;

import com.qubit.qubit.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    @Query("SELECT DISTINCT q FROM QuestionEntity q " +
            "LEFT JOIN FETCH q.tags t " +
            "LEFT JOIN FETCH q.answers " +
            "LEFT JOIN FETCH q.author " +
            "WHERE t.id = :tagId")
    List<QuestionEntity> getAllQuestionsByTag(@Param("tagId") Long tagId);

    @Modifying
    @Query(value = "DELETE FROM question_tags WHERE question_id = :questionId", nativeQuery = true)
    void deleteQuestionTagsRelations(@Param("questionId") Long questionId);

    List<QuestionEntity> findByTitleContaining(String keyword);

    @Query("SELECT q FROM QuestionEntity q LEFT JOIN FETCH q.tags WHERE q.id = :id")
    Optional<QuestionEntity> findByIdWithTags(@Param("id") Long id);

    @Query("SELECT DISTINCT q FROM QuestionEntity q LEFT JOIN FETCH q.tags")
    List<QuestionEntity> findAllWithTags();

    @Query("SELECT q FROM QuestionEntity q LEFT JOIN q.answers a WHERE a IS NULL")
    List<QuestionEntity> findQuestionsWithoutAnswers();
}
