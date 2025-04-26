package com.movie.movieapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPreferencesDto {
	
	private Long id;
	
	private UserDto userDto;
	
	private List<MovieDto> likedMovieDtos;

}
