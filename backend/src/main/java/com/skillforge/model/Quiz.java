package com.skillforge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String skill;
    private String difficulty; // EASY, MEDIUM, HARD
    private List<Question> questions = new ArrayList<>();
    private boolean active = true;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public Quiz() {}
    
    public Quiz(String title, String skill, String difficulty) {
        this.title = title;
        this.skill = skill;
        this.difficulty = difficulty;
    }
    
    // Inner class for Questions
    public static class Question {
        private String id;
        private String question;
        private List<String> options = new ArrayList<>();
        private int correctAnswer;
        private String explanation;
        private String difficulty;
        
        // Constructors
        public Question() {}
        
        public Question(String question, List<String> options, int correctAnswer, String difficulty) {
            this.question = question;
            this.options = options;
            this.correctAnswer = correctAnswer;
            this.difficulty = difficulty;
        }
        
        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        
        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }
        
        public int getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(int correctAnswer) { this.correctAnswer = correctAnswer; }
        
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
        
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}