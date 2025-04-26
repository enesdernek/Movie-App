package com.movie.movieapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.movieapp.dto.CategoryDto;
import com.movie.movieapp.service.concretes.CategoryService;

@RestController
@RequestMapping("category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("getall")
	public ResponseEntity<List<CategoryDto>> getAll(){
		return new ResponseEntity<>(this.categoryService.getAll(),HttpStatus.OK);
	}

}
