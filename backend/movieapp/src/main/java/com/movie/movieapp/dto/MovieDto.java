package com.movie.movieapp.dto;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.movie.movieapp.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {

	private Long id;

	private String title;

	private String description;

	private String imagePath;

	private String videoPath;
	
	private int numberOfLikes;

	@JsonIgnore
	private List<CommentDto> commentsDtos;
	
	private CategoryDto categoryDto;

}
