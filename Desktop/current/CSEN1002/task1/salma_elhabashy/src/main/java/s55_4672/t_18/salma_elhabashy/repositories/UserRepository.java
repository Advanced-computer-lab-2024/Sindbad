package s55_4672.t_18.salma_elhabashy.repositories;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;
import s55_4672.t_18.salma_elhabashy.models.User;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepository {

    private List<User> users;
    private java.io.File jsonFile;

    public UserRepository() {
        InputStream inputStream = getClass().getResourceAsStream("/users.json");
        if (inputStream == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unable to read users.json");
        }
        try {
            this.jsonFile = new java.io.File(getClass().getResource("/users.json").toURI());
        } catch (Exception e) {
            this.jsonFile = new java.io.File("/data/users.json");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.users = objectMapper.readValue(inputStream, new TypeReference<List<User>>() {});
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to parse users.json");
        }
    }

    public List<User> findAll(){
        return users;
    }

    public Optional<User> findById(String id){
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    public Optional<User> findByUsername(String username){
        return users.stream()
                .filter(user -> user.getUsername().equalsIgnoreCase(username))
                .findFirst();
    }

    public User save(User user) {
        user.setId(UUID.randomUUID().toString());

        if (user.getCreatedAt() == null) {
            user.setCreatedAt(java.time.LocalDateTime.now());
        }

        users.add(user);
        try {
            new ObjectMapper().writeValue(jsonFile, users);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save user");
        }

        return user;
    }

    public Optional<User> update(String id, User updated) {
        Optional<User> userOptional = users.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();

        userOptional.ifPresent(existingUser -> {
            if (updated.getUsername() != null && !updated.getUsername().isBlank()) {
                existingUser.setUsername(updated.getUsername());
            }

            if (updated.getEmail() != null && !updated.getEmail().isBlank()) {
                existingUser.setEmail(updated.getEmail());
            }

            try {
                new ObjectMapper().writeValue(jsonFile, users);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save changes to disk");
            }
        });

        return userOptional;
    }

    public boolean deleteById(String id){
        boolean removed = users.removeIf(user -> user.getId().equals(id));

        if (removed) {
            try {
                new ObjectMapper().writeValue(jsonFile, users);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete user");
            }
        }

        return removed;
    }
}
