package s55_4672.t_18.salma_elhabashy.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import s55_4672.t_18.salma_elhabashy.models.User;
import s55_4672.t_18.salma_elhabashy.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(String id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public  User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(String id, User user){
        return userRepository.update(id, user).
                orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }


    public void deleteUser(String id){
        boolean deleted = userRepository.deleteById(id);
        if(!deleted)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

    }


}
