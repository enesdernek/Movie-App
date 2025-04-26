package com.movie.movieapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPreferencesDtoIU {

	private Long id;

	private Long userId;

	private List<MovieDto> likedMovieDtos;

}
