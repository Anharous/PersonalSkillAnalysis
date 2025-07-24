package com.skillforge.service;

import com.skillforge.model.Quiz;
import com.skillforge.model.QuizAttempt;
import com.skillforge.repository.QuizRepository;
import com.skillforge.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    
    @Autowired
    private UserService userService;
    
    public List<Quiz> getAllActiveQuizzes() {
        return quizRepository.findActiveQuizzes();
    }
    
    public List<Quiz> getQuizzesBySkills(List<String> skills) {
        return quizRepository.findActiveQuizzesBySkills(skills);
    }
    
    public Optional<Quiz> getQuizById(String id) {
        return quizRepository.findById(id);
    }
    
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    public void deleteQuiz(String id) {
        quizRepository.deleteById(id);
    }
    
    public QuizAttempt startQuizAttempt(String userId, String quizId) {
        // Check if user already has an incomplete attempt
        Optional<QuizAttempt> existingAttempt = quizAttemptRepository.findByUserIdAndQuizId(userId, quizId);
        if (existingAttempt.isPresent() && !existingAttempt.get().isCompleted()) {
            return existingAttempt.get();
        }
        
        QuizAttempt attempt = new QuizAttempt(userId, quizId);
        return quizAttemptRepository.save(attempt);
    }
    
    public QuizAttempt submitQuizAttempt(QuizAttempt attempt) {
        // Calculate score
        int correctAnswers = 0;
        for (QuizAttempt.Answer answer : attempt.getAnswers()) {
            if (answer.isCorrect()) {
                correctAnswers++;
            }
        }
        
        attempt.setCorrectAnswers(correctAnswers);
        attempt.setTotalQuestions(attempt.getAnswers().size());
        attempt.setScore((correctAnswers * 100) / attempt.getTotalQuestions());
        attempt.setCompleted(true);
        
        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);
        
        // Award XP to user
        int xpReward = Math.max(50, attempt.getScore());
        userService.updateUserXP(attempt.getUserId(), xpReward);
        
        // Award badges based on performance
        if (attempt.getScore() >= 90) {
            userService.addBadgeToUser(attempt.getUserId(), "Quiz Master");
        }
        
        return savedAttempt;
    }
    
    public List<QuizAttempt> getUserQuizAttempts(String userId) {
        return quizAttemptRepository.findByUserId(userId);
    }
    
    public List<QuizAttempt> getCompletedAttemptsByUser(String userId) {
        return quizAttemptRepository.findCompletedAttemptsByUserId(userId);
    }
    
    public Optional<QuizAttempt> getUserQuizAttempt(String userId, String quizId) {
        return quizAttemptRepository.findByUserIdAndQuizId(userId, quizId);
    }
}