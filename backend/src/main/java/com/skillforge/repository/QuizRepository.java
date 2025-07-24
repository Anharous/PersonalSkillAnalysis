package com.skillforge.repository;

import com.skillforge.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findBySkill(String skill);
    
    List<Quiz> findByDifficulty(String difficulty);
    
    List<Quiz> findBySkillAndDifficulty(String skill, String difficulty);
    
    @Query("{'active': true}")
    List<Quiz> findActiveQuizzes();
    
    @Query("{'skill': {$in: ?0}, 'active': true}")
    List<Quiz> findActiveQuizzesBySkills(List<String> skills);
}