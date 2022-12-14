import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoryDataService from '../../services/story.service';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function StoryComponent() {
    const id = useParams().id;
    const [story, setStory] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            let data = await StoryDataService.get(id);
            data.data.view++;
            data = await StoryDataService.update(id, data.data);
            setStory(data.data);
        };
        fetchdata()
            .then()
            .catch((error) => console.log(error));
    }, [id]);

    const updateStory = (data) => {
        StoryDataService.update(data.id, data)
            .then((response) => setStory(response.data))
            .catch((error) => console.log(error));
    };

    const onDownload = () => {
        const link = document.createElement('a');
        link.download = `${story.title}.png`;
        link.href = `${process.env.PUBLIC_URL}/story-images/${story.title}.png`;
        link.click();
    };

    return (
        <Card sx={{ width: '80%', margin: '2% auto' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    { story.title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { story.description }
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Total Views - { story.view }
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onDownload}
                >Download Story</Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        const temp = story;
                        temp.like++;
                        updateStory(temp);
                    }}
                >Like - { story.like }</Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        const temp = story;
                        temp.dislike++;
                        updateStory(temp);
                    }}
                >Dislike - { story.dislike }</Button>
            </CardActions>
        </Card>
    );
}

export default StoryComponent;