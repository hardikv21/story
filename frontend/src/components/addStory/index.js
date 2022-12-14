import { useState } from 'react';
import { Box, Button, TextField, Card, CardContent, Typography, CardActions } from '@mui/material';
import StoryDataService from '../../services/story.service';
import { useNavigate  } from 'react-router-dom';
import { Save, Clear } from '@mui/icons-material';

function AddStoryComponent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const story = {
            'title': title,
            'description': description
        };
        StoryDataService.create(story)
            .then(() => navigate('/'))
            .catch((error) => console.log(error));
    };

    return (
        <Card sx={{ width: '80%', margin: '2% auto', boxShadow: 'none' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Add a Story
                </Typography>
                <Box>
                    <TextField
                        label="Title"
                        variant="outlined"
                        required
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Description"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        sx={{ width: '80%', marginTop: '2%' }}
                    />
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-around' }}>
                <Button
                    variant="outlined"
                    href='/'
                    endIcon={<Clear />}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    disabled={!title || !description}
                    onClick={handleSubmit}
                    endIcon={<Save />}
                >
                    Save
                </Button>
            </CardActions>
        </Card>
    );
}

export default AddStoryComponent;