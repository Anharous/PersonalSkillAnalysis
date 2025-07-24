package com.skillforge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "learning_modules")
public class LearningModule {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String skill;
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED
    private String type; // VIDEO, ARTICLE, PRACTICE, INTERACTIVE
    private String duration;
    private String url;
    private String thumbnailUrl;
    private int xpReward;
    private boolean isPremium;
    private List<String> prerequisites = new ArrayList<>();
    private List<String> tags = new ArrayList<>();
    private boolean active = true;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public LearningModule() {}
    
    public LearningModule(String title, String skill, String difficulty, String type) {
        this.title = title;
        this.skill = skill;
        this.difficulty = difficulty;
        this.type = type;
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
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    
    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }
    
    public boolean isPremium() { return isPremium; }
    public void setPremium(boolean premium) { isPremium = premium; }
    
    public List<String> getPrerequisites() { return prerequisites; }
    public void setPrerequisites(List<String> prerequisites) { this.prerequisites = prerequisites; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}