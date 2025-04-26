package com.movie.movieapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movie.movieapp.model.Comment;

import jakarta.transaction.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	List<Comment> getAllByMovie_IdOrderByIdDesc(Long id);	
	

}
