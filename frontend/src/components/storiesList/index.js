import { useState, useEffect } from 'react';
import StoryDataService from '../../services/story.service';
import { Box, Card, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { Send, ThumbUpOffAlt, ThumbDownOffAlt } from '@mui/icons-material';

function StoriesListComponent() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        StoryDataService.getAll()
            .then((response) => setStories([...response.data]))
            .catch((error) => console.log(error))
    }, []);

    const updateStory = (story, index) => {
        StoryDataService.update(story.id, story)
            .then((response) => {
                const temp = [...stories];
                temp[index] = response.data;
                setStories(temp);
            })
            .catch((error) => console.log(error));
    };

    return (
        stories.map(
            (story, index) => (
                <Box key={story.id}>
                    <Card variant='outlined' sx={{ width: '30%', margin: '1% auto' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                { story.title }
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1.5 }}>
                                <Button variant="outlined" endIcon={<Send />} href={`/stories/${story.id}`}>
                                    Story
                                </Button>
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <IconButton
                                onClick={() => {
                                    const temp = story;
                                    temp.like++;
                                    updateStory(temp, index);
                                }}
                            >
                                <ThumbUpOffAlt />
                            </IconButton>
                            { story.like }
                            <IconButton
                                onClick={() => {
                                    const temp = story;
                                    temp.dislike++;
                                    updateStory(temp, index);
                                }}
                            >
                                <ThumbDownOffAlt />
                            </IconButton>
                            { story.dislike }
                        </CardActions>
                    </Card>
                </Box>
            )
        )
    );
}

export default StoriesListComponent;