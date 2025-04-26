package com.movie.movieapp.jwt;


import com.movie.movieapp.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	
	private UserDto userDto;
	
	private String token;

}
