package com.movie.movieapp.service.abstracts;

import java.util.List;

import com.movie.movieapp.dto.MovieDto;
import com.movie.movieapp.model.Movie;

public interface IMovieService {
	
	List<MovieDto>getAll();
	
	MovieDto getById(Long id);
	
	MovieDto getMovieByTitle(String title);
	
	List<MovieDto> getByCategoryName(String name);
	
	List<MovieDto> getByTitleContains(String title);
	
	

}
