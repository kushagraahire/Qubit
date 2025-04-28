package com.qubit.qubit.service;

import com.qubit.qubit.entity.UserEntity;
import com.qubit.qubit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(username).orElse(null);
        if(user != null){
            return User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .build();
        }
        throw new UsernameNotFoundException("Email Not Found: " +username);
    }
}
