package com.movie.movieapp.service.abstracts;

import java.util.List;

import com.movie.movieapp.dto.CommentDto;
import com.movie.movieapp.dto.CommentDtoIU;
import com.movie.movieapp.model.Comment;


public interface ICommentService {
	
	CommentDto postComment(CommentDtoIU commentDtoIU);
	
	void deleteComment(Long commentId,Long userId);
	
	List<CommentDto> getAllByMovie_IdOrderByIdDesc(Long id);	
	


}
