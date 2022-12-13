package com.springboot.storieswithimages.controller;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.springboot.storieswithimages.model.Story;
import com.springboot.storieswithimages.repository.StoryRepository;

@RestController
@RequestMapping("/api")
public class StoryController {
	
	@Autowired
	StoryRepository storyRepository;
	
	@GetMapping("/stories")
	public ResponseEntity<List<Story>> getAllStories(@RequestParam(required = false) String title) {
		try {
			List<Story> stories = new ArrayList<Story>();

			if (title == null)
				storyRepository.findAll().forEach(stories::add);
			else
				storyRepository.findByTitleContaining(title).forEach(stories::add);

			if (stories.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(stories, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/stories/{id}")
	public ResponseEntity<Story> getStoryById(@PathVariable("id") long id) {
		Optional<Story> storyData = storyRepository.findById(id);

		if (storyData.isPresent()) {
			return new ResponseEntity<>(storyData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/stories")
	public ResponseEntity<Story> createStory(@RequestBody Story story) {
		try {
			Story _story = storyRepository.save(new Story(story.getTitle(), story.getDescription(), 0, 0));
			convert(story.getTitle(), story.getDescription());
			return new ResponseEntity<>(_story, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/stories/{id}")
	public ResponseEntity<Story> updateStory(@PathVariable("id") long id, @RequestBody Story story) {
		Optional<Story> storyData = storyRepository.findById(id);

		if (storyData.isPresent()) {
			Story _story = storyData.get();
			_story.setTitle(story.getTitle());
			_story.setDescription(story.getDescription());
			_story.setLike(story.getLike());
			_story.setDislike(story.getDislike());
			return new ResponseEntity<>(storyRepository.save(_story), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/stories/{id}")
	public ResponseEntity<HttpStatus> deleteStory(@PathVariable("id") long id) {
		try {
			storyRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/stories")
	public ResponseEntity<HttpStatus> deleteAllStories() {
		try {
			storyRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public void convert(String title, String description) {
		BufferedImage image = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);// Represents an image with 8-bit RGBA color components packed into integer pixels.
        Graphics2D graphics2d = image.createGraphics();
        Font font = new Font("TimesNewRoman", Font.BOLD, 24);
        graphics2d.setFont(font);
        FontMetrics fontmetrics = graphics2d.getFontMetrics();
        int width = fontmetrics.stringWidth(description);
        int height = fontmetrics.getHeight();
        graphics2d.dispose();

        image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        graphics2d = image.createGraphics();
        graphics2d.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
        graphics2d.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        graphics2d.setFont(font);
        fontmetrics = graphics2d.getFontMetrics();
        graphics2d.setColor(Color.GREEN);
        
        graphics2d.setStroke(new BasicStroke(2));
        graphics2d.drawLine(0, 0, 0, height);
        graphics2d.drawLine(0, 0, width, 0);
        graphics2d.drawLine(0, height, width, height);
        graphics2d.drawLine(width, height, width, 0);
        
        graphics2d.drawString(description, 0, fontmetrics.getAscent());
        graphics2d.dispose();
        try {
            ImageIO.write(image, "png", new File("../story-images/" + title + ".png"));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
	}
}