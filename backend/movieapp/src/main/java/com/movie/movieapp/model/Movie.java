package com.movie.movieapp.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="movie")
public class Movie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description",length=1000)
	private String description;
	
	@Column(name="image_path")
	private String imagePath;
	
	@Column(name="video_path")
	private String videoPath;
	
	@Column(name = "number_of_likes", nullable = false, columnDefinition = "int default 0")
	private int numberOfLikes;
	
	@OneToMany(mappedBy = "movie")
	private List<Comment>comments;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	

}
