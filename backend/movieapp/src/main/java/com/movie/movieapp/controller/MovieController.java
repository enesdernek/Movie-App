package com.movie.movieapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movie.movieapp.dto.MovieDto;
import com.movie.movieapp.service.concretes.MovieService;

@RestController
@RequestMapping(path="/movie")
public class MovieController {
	
	@Autowired
	private MovieService movieService;
	
	@GetMapping("getbytitlecontains")
	public ResponseEntity<List<MovieDto>> getByTitleContains(@RequestParam String title){
		return new ResponseEntity<>(this.movieService.getByTitleContains(title),HttpStatus.OK);
	}

	
	@GetMapping("getbycategoryname")
	public ResponseEntity<List<MovieDto>> getByCategoryName(@RequestParam String name){
		return new ResponseEntity<>(this.movieService.getByCategoryName(name),HttpStatus.OK);
	}
	
	@GetMapping("getbytitle")
	public ResponseEntity<MovieDto> getMovieByTitle(@RequestParam String title) {
		return new ResponseEntity<>(this.movieService.getMovieByTitle(title),HttpStatus.OK);
	}
	
	@GetMapping("/getbyid")
	public ResponseEntity<MovieDto> getById(@RequestParam Long id){
		return new ResponseEntity<>(this.movieService.getById(id),HttpStatus.OK);
	}
	
	@GetMapping("/getall")
    public ResponseEntity<List<MovieDto>> getAll() {
        List<MovieDto> movieDtos = this.movieService.getAll();
        
        if (movieDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        
        return new ResponseEntity<>(movieDtos, HttpStatus.OK); // 200 OK
    }
	
	

}
