import { useState, useEffect } from 'react';
import StoryDataService from "../../services/story.service";

function StoriesListComponent() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        StoryDataService.getAll().then((response) => {
            console.log(response);
            setStories([...response.data]);
        });
    }, []);

    return (
        <>
            {
                stories
                    ? (
                        stories.map((story) => <h1 key={story.id}>{story.title}</h1>)
                    )
                    : null
            }
        </>
    );
}

export default StoriesListComponent;