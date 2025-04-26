package com.movie.movieapp.service.concretes;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.movieapp.dto.CategoryDto;
import com.movie.movieapp.dto.MovieDto;
import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.dto.UserPreferencesDto;
import com.movie.movieapp.model.Movie;
import com.movie.movieapp.model.User;
import com.movie.movieapp.model.UserPreferences;
import com.movie.movieapp.repository.MovieRepository;
import com.movie.movieapp.repository.UserPreferencesRepository;
import com.movie.movieapp.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserPreferencesService {

	@Autowired
	private UserPreferencesRepository userPreferencesRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;

	public void handleLikeMovieWithdraw(Long userId, Long movieId) {
		UserPreferences userPreferences = this.userPreferencesRepository.getByUser_Id(userId);
		Movie likedMovie = this.movieRepository.findById(movieId).orElse(null);

		if (likedMovie != null) {
			Iterator<Movie> iterator = userPreferences.getLikedMovies().iterator();
			while (iterator.hasNext()) {
				Movie likedMovieBefore = iterator.next();
				if (likedMovie.getId() == (likedMovieBefore.getId())) {
					iterator.remove(); // Safely remove the movie from the list

					likedMovie.setNumberOfLikes(likedMovie.getNumberOfLikes() - 1);

					this.movieRepository.save(likedMovie);
					break; // Exit the loop once the movie is found and removed
				}
			}
		}
		this.userPreferencesRepository.save(userPreferences);
	}

	public void handleLikeMovie(Long userId, Long movieId) {
		UserPreferences userPreferences = this.userPreferencesRepository.getByUser_Id(userId);

		Movie likedMovie = this.movieRepository.findById(movieId).get();

		for (Movie likedMovieBefore : userPreferences.getLikedMovies()) {
			if (likedMovie.getId().equals(likedMovieBefore.getId())) {
				throw new IllegalStateException("Movie is already liked by the user");
			}
		}

		likedMovie.setNumberOfLikes(likedMovie.getNumberOfLikes() + 1);
		this.movieRepository.save(likedMovie);

		userPreferences.getLikedMovies().add(likedMovie);
		this.userPreferencesRepository.save(userPreferences);
	}

	public UserPreferencesDto getByUserId(Long id) {

		UserPreferences userPreferences = this.userPreferencesRepository.getByUser_Id(id);

		UserPreferencesDto userPreferencesDto = new UserPreferencesDto();

		BeanUtils.copyProperties(userPreferences, userPreferencesDto);
		
		UserDto userDto = new UserDto();
		
		BeanUtils.copyProperties(userPreferences.getUser(), userDto);
		
		userPreferencesDto.setUserDto(userDto);


		List<MovieDto> likedMoviesDto = new ArrayList<>();

		for (Movie movie : userPreferences.getLikedMovies()) {
			MovieDto movieDto = new MovieDto();

			CategoryDto categoryDto = new CategoryDto();

			BeanUtils.copyProperties(movie.getCategory(), categoryDto);

			BeanUtils.copyProperties(movie, movieDto);

			movieDto.setCategoryDto(categoryDto);

			likedMoviesDto.add(movieDto);
		}

		userPreferencesDto.setLikedMovieDtos(likedMoviesDto);

		return userPreferencesDto;

	}

}
