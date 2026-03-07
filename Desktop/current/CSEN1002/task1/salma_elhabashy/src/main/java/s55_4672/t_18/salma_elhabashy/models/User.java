package s55_4672.t_18.salma_elhabashy.models;

import java.time.LocalDateTime;
import java.util.UUID;

public class User {


    private String id;
    private String username;
    private String email;
    private LocalDateTime createdAt;

    // empty constructor
    public User() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
    }

    // without id
    public User(String username, String email){
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }

    // full constructor
    public User(String id, String username, String email, LocalDateTime createdAt){
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
