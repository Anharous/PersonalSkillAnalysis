package com.skillforge.dto;

import com.skillforge.model.User;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private UserDto user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserDto(user);
    }
    
    // Inner UserDto class to avoid exposing password
    public static class UserDto {
        private String id;
        private String email;
        private String name;
        private String role;
        private boolean profileComplete;
        private String currentRole;
        private String desiredRole;
        private int xp;
        private int level;
        
        public UserDto(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.name = user.getName();
            this.role = user.getRole();
            this.profileComplete = user.isProfileComplete();
            this.currentRole = user.getCurrentRole();
            this.desiredRole = user.getDesiredRole();
            this.xp = user.getXp();
            this.level = user.getLevel();
        }
        
        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        
        public boolean isProfileComplete() { return profileComplete; }
        public void setProfileComplete(boolean profileComplete) { this.profileComplete = profileComplete; }
        
        public String getCurrentRole() { return currentRole; }
        public void setCurrentRole(String currentRole) { this.currentRole = currentRole; }
        
        public String getDesiredRole() { return desiredRole; }
        public void setDesiredRole(String desiredRole) { this.desiredRole = desiredRole; }
        
        public int getXp() { return xp; }
        public void setXp(int xp) { this.xp = xp; }
        
        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }
    }
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}