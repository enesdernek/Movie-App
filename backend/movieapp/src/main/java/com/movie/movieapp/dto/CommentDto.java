package com.movie.movieapp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDto {
	
	private Long id;

	private String content;

	private LocalDateTime date;

	private UserDto userDto;
	
	private MovieDto movieDto;

}
