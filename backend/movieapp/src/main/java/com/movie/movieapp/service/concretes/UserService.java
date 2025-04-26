package com.movie.movieapp.service.concretes;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.dto.UserDtoIU;
import com.movie.movieapp.jwt.AuthResponse;
import com.movie.movieapp.jwt.JwtService;
import com.movie.movieapp.model.User;
import com.movie.movieapp.model.UserPreferences;
import com.movie.movieapp.repository.UserPreferencesRepository;
import com.movie.movieapp.repository.UserRepository;
import com.movie.movieapp.service.abstracts.IUserService;

@Service
public class UserService implements IUserService{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired 
	private UserPreferencesRepository userPreferencesRepository;

	
	public AuthResponse authenticate(UserDtoIU userDtoIU) {
		try {
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDtoIU.getUsername(),userDtoIU.getPassword());
			authenticationProvider.authenticate(auth);
			
			User user = userRepository.findByUsername(userDtoIU.getUsername());
			UserDto userDto = new UserDto();
			BeanUtils.copyProperties(user, userDto);
			String token = jwtService.generateToken(user);
			
			return new AuthResponse(userDto,token);
			
		}catch(Exception e) {
			System.out.println("Kullanıcı adı veya şifre hatalı :" +e.getMessage());
		}
		return null;
	}
	
	
	public UserDto register(UserDtoIU userDtoIU) {
		
		List<User>users = this.userRepository.findAll();
		
		for(User user: users) {
			if(user.getUsername().equals(userDtoIU.getUsername())) {
				return null;
			}
		}
				
		User user = new User();
			
		user.setUsername(userDtoIU.getUsername());
		
		user.setPassword(passwordEncoder.encode(userDtoIU.getPassword()));
		
		User savedUser = userRepository.save(user);
		
		UserPreferences userPreferences = new UserPreferences();
	
		userPreferences.setUser(savedUser);
		
		this.userPreferencesRepository.save(userPreferences);
		
		UserDto dtoUser = new UserDto();
		
		BeanUtils.copyProperties(savedUser, dtoUser);
		
		return dtoUser;
		
	}
}
