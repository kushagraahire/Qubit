package com.qubit.qubit.repository;

import com.qubit.qubit.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u, SIZE(u.questions) + SIZE(u.answers) AS total " +
            "FROM UserEntity u " +
            "ORDER BY total DESC")
    List<UserEntity> getTopContributors(Pageable pageable);
}
