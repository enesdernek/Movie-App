package com.movie.movieapp.service.concretes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.movieapp.dto.CommentDto;
import com.movie.movieapp.dto.CommentDtoIU;
import com.movie.movieapp.dto.MovieDto;
import com.movie.movieapp.dto.UserDto;
import com.movie.movieapp.model.Comment;
import com.movie.movieapp.model.Movie;
import com.movie.movieapp.model.User;
import com.movie.movieapp.repository.CommentRepository;
import com.movie.movieapp.repository.MovieRepository;
import com.movie.movieapp.repository.UserRepository;
import com.movie.movieapp.service.abstracts.ICommentService;

@Service
public class CommentService implements ICommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MovieRepository movieRepository;
	
	
	@Override
	public void deleteComment(Long commentId, Long userId) {
		Comment deleteRequestedComment = this.commentRepository.findById(commentId).get();
		
		if(deleteRequestedComment.getUser().getId()!=userId) {
			// exception
			return;
		}
		
		this.commentRepository.delete(deleteRequestedComment);
	}

	@Override
	public CommentDto postComment(CommentDtoIU commentDtoIU) {

		User user = this.userRepository.findById(commentDtoIU.getUserId()).get();

		Movie movie = this.movieRepository.findById(commentDtoIU.getMovieId()).get();
		
		

		Comment comment = new Comment();

		BeanUtils.copyProperties(commentDtoIU, comment);

		comment.setUser(user);

		comment.setMovie(movie);
		
		Comment dbComment = this.commentRepository.save(comment);
		
		CommentDto commentDto = new CommentDto();
		
		BeanUtils.copyProperties(dbComment, commentDto);
		
		MovieDto movieDto = new MovieDto();
		
		BeanUtils.copyProperties(movie, movieDto);
		
		commentDto.setMovieDto(movieDto);
		
		UserDto userDto = new UserDto();
		
		BeanUtils.copyProperties(user,userDto);
		
		commentDto.setUserDto(userDto);
		
		return commentDto;

	}

	@Override
	public List<CommentDto> getAllByMovie_IdOrderByIdDesc(Long id) {
		List<Comment>comments = this.commentRepository.getAllByMovie_IdOrderByIdDesc(id);
		List<CommentDto> commentDtos = new ArrayList<>();
		
		for(Comment comment : comments) {
			CommentDto commentDto = new CommentDto();		
			BeanUtils.copyProperties(comment, commentDto);
			
			UserDto userDto = new UserDto();
			
			BeanUtils.copyProperties(comment.getUser(), userDto);
			
			commentDto.setUserDto(userDto);
			
			//MovieDto movieDto = new MovieDto();
			
			//BeanUtils.copyProperties(comment.getMovie(), movieDto);
			
			//commentDto.setMovieDto(movieDto);
			
			commentDtos.add(commentDto);
		}
		
		return commentDtos;
			
	}

	
	

}
