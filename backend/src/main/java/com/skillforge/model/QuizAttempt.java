package com.skillforge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "quiz_attempts")
public class QuizAttempt {
    @Id
    private String id;
    
    private String userId;
    private String quizId;
    private List<Answer> answers = new ArrayList<>();
    private int score;
    private int totalQuestions;
    private int correctAnswers;
    private long timeTaken; // in seconds
    private boolean completed;
    
    @CreatedDate
    private LocalDateTime attemptedAt;
    
    // Inner class for Answers
    public static class Answer {
        private String questionId;
        private int selectedOption;
        private boolean correct;
        private long timeSpent; // in seconds
        
        // Constructors
        public Answer() {}
        
        public Answer(String questionId, int selectedOption, boolean correct, long timeSpent) {
            this.questionId = questionId;
            this.selectedOption = selectedOption;
            this.correct = correct;
            this.timeSpent = timeSpent;
        }
        
        // Getters and Setters
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        
        public int getSelectedOption() { return selectedOption; }
        public void setSelectedOption(int selectedOption) { this.selectedOption = selectedOption; }
        
        public boolean isCorrect() { return correct; }
        public void setCorrect(boolean correct) { this.correct = correct; }
        
        public long getTimeSpent() { return timeSpent; }
        public void setTimeSpent(long timeSpent) { this.timeSpent = timeSpent; }
    }
    
    // Constructors
    public QuizAttempt() {}
    
    public QuizAttempt(String userId, String quizId) {
        this.userId = userId;
        this.quizId = quizId;
        this.completed = false;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getQuizId() { return quizId; }
    public void setQuizId(String quizId) { this.quizId = quizId; }
    
    public List<Answer> getAnswers() { return answers; }
    public void setAnswers(List<Answer> answers) { this.answers = answers; }
    
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    
    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }
    
    public long getTimeTaken() { return timeTaken; }
    public void setTimeTaken(long timeTaken) { this.timeTaken = timeTaken; }
    
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    
    public LocalDateTime getAttemptedAt() { return attemptedAt; }
    public void setAttemptedAt(LocalDateTime attemptedAt) { this.attemptedAt = attemptedAt; }
}