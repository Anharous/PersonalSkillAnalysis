package com.skillforge.controller;

import com.skillforge.model.Quiz;
import com.skillforge.model.QuizAttempt;
import com.skillforge.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllActiveQuizzes();
        return ResponseEntity.ok(quizzes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable String id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/by-skills")
    public ResponseEntity<List<Quiz>> getQuizzesBySkills(@RequestParam List<String> skills) {
        List<Quiz> quizzes = quizService.getQuizzesBySkills(skills);
        return ResponseEntity.ok(quizzes);
    }
    
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.ok(createdQuiz);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable String id, @RequestBody Quiz quiz) {
        quiz.setId(id);
        Quiz updatedQuiz = quizService.updateQuiz(quiz);
        return ResponseEntity.ok(updatedQuiz);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable String id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{quizId}/start")
    public ResponseEntity<QuizAttempt> startQuiz(
            @PathVariable String quizId,
            @RequestParam String userId) {
        QuizAttempt attempt = quizService.startQuizAttempt(userId, quizId);
        return ResponseEntity.ok(attempt);
    }
    
    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<QuizAttempt> submitQuiz(
            @PathVariable String attemptId,
            @RequestBody QuizAttempt attempt) {
        attempt.setId(attemptId);
        QuizAttempt submittedAttempt = quizService.submitQuizAttempt(attempt);
        return ResponseEntity.ok(submittedAttempt);
    }
    
    @GetMapping("/users/{userId}/attempts")
    public ResponseEntity<List<QuizAttempt>> getUserQuizAttempts(@PathVariable String userId) {
        List<QuizAttempt> attempts = quizService.getUserQuizAttempts(userId);
        return ResponseEntity.ok(attempts);
    }
    
    @GetMapping("/users/{userId}/attempts/{quizId}")
    public ResponseEntity<QuizAttempt> getUserQuizAttempt(
            @PathVariable String userId,
            @PathVariable String quizId) {
        Optional<QuizAttempt> attempt = quizService.getUserQuizAttempt(userId, quizId);
        return attempt.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}