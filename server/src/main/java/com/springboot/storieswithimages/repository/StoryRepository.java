package com.springboot.storieswithimages.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.storieswithimages.model.Story;

public interface StoryRepository extends JpaRepository<Story, Long> {
  List<Story> findByTitleContaining(String title);
}