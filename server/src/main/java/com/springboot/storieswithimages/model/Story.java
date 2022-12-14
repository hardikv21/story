package com.springboot.storieswithimages.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stories")
public class Story {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;
	
	@Column(name = "like")
	private int like;
	
	@Column(name = "dislike")
	private int dislike;
	
	@Column(name = "view")
	private int view;
	
	public Story() {

	}

	public Story(String title, String description, int like, int dislike, int view) {
		this.title = title;
		this.description = description;
		this.like = like;
		this.dislike = dislike;
		this.view = view;
	}
	
	public long getId() {
		return id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getLike() {
		return like;
	}

	public void setLike(int like) {
		this.like = like;
	}

	public int getDislike() {
		return dislike;
	}

	public void setDislike(int dislike) {
		this.dislike = dislike;
	}
	
	public int getView() {
		return view;
	}

	public void setView(int view) {
		this.view = view;
	}
	
	@Override
	public String toString() {
		return "Story [id=" + id + ", title=" + title + ", like=" + like + ", dislike=" + dislike + "]";
	}
}