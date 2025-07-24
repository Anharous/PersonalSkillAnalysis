package com.skillforge.repository;

import com.skillforge.model.UserProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends MongoRepository<UserProgress, String> {
    List<UserProgress> findByUserId(String userId);
    
    List<UserProgress> findByModuleId(String moduleId);
    
    Optional<UserProgress> findByUserIdAndModuleId(String userId, String moduleId);
    
    @Query("{'userId': ?0, 'status': ?1}")
    List<UserProgress> findByUserIdAndStatus(String userId, String status);
    
    @Query("{'userId': ?0, 'status': 'COMPLETED'}")
    List<UserProgress> findCompletedModulesByUserId(String userId);
    
    @Query("{'userId': ?0, 'progressPercentage': {$gte: ?1}}")
    List<UserProgress> findByUserIdAndProgressGreaterThanEqual(String userId, int minProgress);
}