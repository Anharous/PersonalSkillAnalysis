package com.skillforge.service;

import com.skillforge.model.User;
import com.skillforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User createUser(String email, String password, String name, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User(email, passwordEncoder.encode(password), name, role);
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    public List<User> findAllUsers() {
        return userRepository.findAllWithoutPassword();
    }
    
    public List<User> findUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
    
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
    public void updateUserXP(String userId, int xpToAdd) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setXp(user.getXp() + xpToAdd);
            user.setLevel((user.getXp() / 1000) + 1); // Level up every 1000 XP
            userRepository.save(user);
        }
    }
    
    public void addBadgeToUser(String userId, String badge) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!user.getBadges().contains(badge)) {
                user.getBadges().add(badge);
                userRepository.save(user);
            }
        }
    }
    
    public long getTotalUserCount() {
        return userRepository.count();
    }
    
    public long getActiveUserCount() {
        return userRepository.countByRole("EMPLOYEE");
    }
}