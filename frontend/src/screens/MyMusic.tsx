import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SongList from "../components/SongList";
import { Audio } from "../wailsjs/go/models";

function MyMusic() {
    const [songs, setSongs] = useState<Audio[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        window.go.app.Application.Search("100 gecs").then((songs: Audio[]) => {
            setSongs(songs);
            setLoading(false);
        });
    }, []);

    return (
        <Box>
            <SongList songs={songs} loading={loading} />
        </Box>
    );
}
export default MyMusic;
