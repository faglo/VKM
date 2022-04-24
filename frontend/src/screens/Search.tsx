import { useEffect, useState } from "react";
import SongList from "../components/SongList";
import { useAppSelector } from "../store/hooks";
import { Audio } from "../wailsjs/go/models";

const Search = () => {
    const search = useAppSelector((state) => state.search.value);
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState<Audio[]>([]);

    useEffect(() => {
        setLoading(true);
        if (search !== "" && search !== undefined && search !== null) {
            window.go.app.Application.Search(search).then((songs: Audio[]) => {
                setSongs(songs);
                setLoading(false);
            });
        }
    }, [search]);
    return <SongList songs={songs} loading={loading} />;
};

export default Search;
