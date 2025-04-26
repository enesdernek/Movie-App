package com.movie.movieapp.service.abstracts;

import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.dto.UserDtoIU;
import com.movie.movieapp.jwt.AuthResponse;

public interface IUserService {
	
	 AuthResponse authenticate(UserDtoIU userDtoIU);
	 
	 UserDto register(UserDtoIU userDtoIU);

}
