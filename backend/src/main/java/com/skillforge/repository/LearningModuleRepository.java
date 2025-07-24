package com.skillforge.repository;

import com.skillforge.model.LearningModule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningModuleRepository extends MongoRepository<LearningModule, String> {
    List<LearningModule> findBySkill(String skill);
    
    List<LearningModule> findByDifficulty(String difficulty);
    
    List<LearningModule> findByType(String type);
    
    @Query("{'skill': {$in: ?0}, 'active': true}")
    List<LearningModule> findActiveModulesBySkills(List<String> skills);
    
    @Query("{'isPremium': ?0, 'active': true}")
    List<LearningModule> findByPremiumStatus(boolean isPremium);
    
    @Query("{'tags': {$in: ?0}, 'active': true}")
    List<LearningModule> findByTagsIn(List<String> tags);
    
    @Query("{'active': true}")
    List<LearningModule> findActiveModules();
}