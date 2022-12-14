import { useParams } from "react-router-dom";

function StoryComponent() {
    const id = useParams().id;

    return (
        <h1>{id}</h1>
    );
}

export default StoryComponent;