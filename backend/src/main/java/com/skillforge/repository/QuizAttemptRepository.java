package com.skillforge.repository;

import com.skillforge.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserId(String userId);
    
    List<QuizAttempt> findByQuizId(String quizId);
    
    Optional<QuizAttempt> findByUserIdAndQuizId(String userId, String quizId);
    
    @Query("{'userId': ?0, 'completed': true}")
    List<QuizAttempt> findCompletedAttemptsByUserId(String userId);
    
    @Query("{'userId': ?0, 'score': {$gte: ?1}}")
    List<QuizAttempt> findByUserIdAndScoreGreaterThanEqual(String userId, int minScore);
    
    @Query(value = "{'completed': true}", fields = "{'userId': 1, 'score': 1, 'attemptedAt': 1}")
    List<QuizAttempt> findAllCompletedAttemptsForAnalytics();
}