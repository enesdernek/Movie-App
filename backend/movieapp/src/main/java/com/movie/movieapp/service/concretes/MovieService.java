package com.movie.movieapp.service.concretes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.movieapp.dto.CategoryDto;
import com.movie.movieapp.dto.CommentDto;
import com.movie.movieapp.dto.MovieDto;
import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.model.Comment;
import com.movie.movieapp.model.Movie;
import com.movie.movieapp.repository.MovieRepository;
import com.movie.movieapp.service.abstracts.IMovieService;

@Service
public class MovieService implements IMovieService {

	@Autowired
	private MovieRepository movieRepository;
	
	@Override
	public List<MovieDto> getByTitleContains(String title) {
		
		List<Movie> movies = this.movieRepository.getByTitleContains(title);
		List<MovieDto>movieDtos = new ArrayList<>();
		
		for(Movie movie:movies) {
			MovieDto movieDto = new MovieDto();
			
			BeanUtils.copyProperties(movie, movieDto);
			
			movieDtos.add(movieDto);
		}
		
		return movieDtos;
	}

	
	@Override
	public List<MovieDto> getByCategoryName(String name) {
		
		List<Movie>movies = this.movieRepository.getByCategory_Name(name);
		List<MovieDto>movieDtos = new ArrayList<>();
		
		for(Movie movie:movies) {
			MovieDto movieDto = new MovieDto();
			CategoryDto categoryDto = new CategoryDto();
			BeanUtils.copyProperties(movie, movieDto);
			BeanUtils.copyProperties(movie.getCategory(), categoryDto);
			
			movieDto.setCategoryDto(categoryDto);
			
			movieDtos.add(movieDto);
			
		}
		
		return movieDtos;
		
	}

	
	@Override
	public MovieDto getById(Long id) {
		Movie movie = this.movieRepository.findById(id).get();
		MovieDto movieDto = new MovieDto();
		
		BeanUtils.copyProperties(movie, movieDto);
		
		return movieDto;
		
		
	}

	@Override
	public List<MovieDto> getAll() {
		List<MovieDto> movieDtos = new ArrayList<>();
		List<Movie> movies = this.movieRepository.findAll();
		

		for (Movie movie : movies) {
			MovieDto movieDto = new MovieDto();

			BeanUtils.copyProperties(movie, movieDto);

			movieDtos.add(movieDto);
			
			CategoryDto categoryDto = new CategoryDto();
			BeanUtils.copyProperties(movie.getCategory(), categoryDto);
			movieDto.setCategoryDto(categoryDto);

			List<Comment> comments = movie.getComments();
			List<CommentDto> commentDtos = new ArrayList<>();
			
			
			
			for (Comment comment : comments) {
				
				CommentDto commentDto = new CommentDto();

				BeanUtils.copyProperties(comment, commentDto);
				
				if (comment.getUser() != null) {
	                UserDto userDto = new UserDto();
	                BeanUtils.copyProperties(comment.getUser(), userDto);
	                commentDto.setUserDto(userDto);
	            }

				commentDtos.add(commentDto);
			}
			
			for(CommentDto commentDto : commentDtos) {
				movieDto.setCommentsDtos(commentDtos);
			}
			
			
			
		    
			
			

		}

		return movieDtos;
	}

	@Override
	public MovieDto getMovieByTitle(String title) {
		Movie movie = this.movieRepository.getMovieByTitle(title);
		MovieDto dtoMovie = new MovieDto ();
		
		BeanUtils.copyProperties(movie, dtoMovie);
		return dtoMovie;
	}


	
	
	

}
