package com.movie.movieapp.service.abstracts;

import com.movie.movieapp.dto.UserPreferencesDto;

public interface IUserPreferencesService {

	public UserPreferencesDto getByUserId(Long id);
			
	public void handleLikeMovie(Long userId,Long movieId);
	
	public void handleLikeMovieWithdraw(Long userId,Long movieId);
}
