package com.movie.movieapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movie.movieapp.dto.UserPreferencesDto;
import com.movie.movieapp.service.concretes.UserPreferencesService;

@RestController
@RequestMapping("/user_preferences")
public class UserPreferencesController {
	
	@Autowired
	private UserPreferencesService userPreferencesService;
	
	@GetMapping("/getbyuserid")
	public ResponseEntity<UserPreferencesDto> getByUserId(@RequestParam Long id) {
		return new ResponseEntity<>(this.userPreferencesService.getByUserId(id),HttpStatus.OK);
	}
	
	@PostMapping("handlelikemoviewithdraw")
	public ResponseEntity<?> handleLikeMovieWithdraw(@RequestParam Long userId,@RequestParam Long movieId) {
		this.userPreferencesService.handleLikeMovieWithdraw(userId, movieId);
		
		return ResponseEntity.ok("Movie like withdrawed successfully");
	}
	
	@PostMapping("handlelikemovie")
	public ResponseEntity<?> handleLikeMovie(@RequestParam Long userId,@RequestParam Long movieId ){
		this.userPreferencesService.handleLikeMovie(userId, movieId); 
	    return ResponseEntity.ok("Movie liked successfully");	}
	
	

}
