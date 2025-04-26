package com.movie.movieapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movie.movieapp.dto.CommentDto;
import com.movie.movieapp.dto.CommentDtoIU;
import com.movie.movieapp.service.concretes.CommentService;


@RestController
@RequestMapping(path="/comment")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@DeleteMapping("deletecomment")
	public ResponseEntity<?> deleteComment(@RequestParam Long commentId,@RequestParam Long userId) {
		this.commentService.deleteComment(commentId, userId);
		return ResponseEntity.ok("comment deleted successfully");
	}
	
	@PostMapping("/post")
	public ResponseEntity<CommentDto> addComment(@RequestBody CommentDtoIU commentDtoIU) {
	        return new ResponseEntity<>(this.commentService.postComment(commentDtoIU),HttpStatus.OK);
	}
	
	@GetMapping("/getallbymovieid")
	public ResponseEntity<List<CommentDto>> getAllByMovieId(@RequestParam Long id){
		return new ResponseEntity<>(this.commentService.getAllByMovie_IdOrderByIdDesc(id),HttpStatus.OK);
	}

}
