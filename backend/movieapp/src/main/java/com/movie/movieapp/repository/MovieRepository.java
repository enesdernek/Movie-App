package com.movie.movieapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movie.movieapp.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>{
	
	Movie getMovieByTitle(String title);
	
	List<Movie> getByCategory_Name(String name);
	
	List<Movie> getByTitleContains(String title);
	

}
