package com.movie.movieapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.dto.UserDtoIU;
import com.movie.movieapp.jwt.AuthResponse;
import com.movie.movieapp.service.concretes.UserService;


@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/authenticate")
	private AuthResponse authenticate(@RequestBody UserDtoIU UserDtoIU) {
		return this.userService.authenticate(UserDtoIU);
	}
	
	@PostMapping("/register")
	private UserDto register(@RequestBody UserDtoIU UserDtoIU) {
		return this.userService.register(UserDtoIU);
	}

}
