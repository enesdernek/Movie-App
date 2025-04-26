package com.movie.movieapp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDtoIU {
	
	private String content;

	private LocalDateTime date;

	private Long userId;
	
	private Long movieId;
	
	

}
