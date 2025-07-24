package com.skillforge.repository;

import com.skillforge.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);
    
    @Query("{'skills': {$in: ?0}}")
    List<User> findBySkillsIn(List<String> skills);
    
    @Query("{'currentRole': ?0}")
    List<User> findByCurrentRole(String currentRole);
    
    @Query("{'desiredRole': ?0}")
    List<User> findByDesiredRole(String desiredRole);
    
    @Query("{'level': {$gte: ?0}}")
    List<User> findByLevelGreaterThanEqual(int level);
    
    long countByRole(String role);
    
    @Query(value = "{}", fields = "{'password': 0}")
    List<User> findAllWithoutPassword();
}