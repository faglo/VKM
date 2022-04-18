import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Audio } from "../wailsjs/go/models";

const sxStyles = {
    mainList: {
        marginLeft: "20px",
    },
};

function MyMusic() {
    const [songs, setSongs] = useState<Audio[]>([]);

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const player = useAppSelector((state) => state.player);

    useEffect(() => {
        setLoading(true);
        window.go.app.Application.Search("100 gecs").then((songs: Audio[]) => {
            setSongs(songs);
            setLoading(false);
        });
    }, []);

    const play = (id: string) => {
        window.go.app.Application.Play(id).then((song) => {
            console.log(song);
        });
    };

    return (
        <Box>
            <List>
                {loading ? (
                    <Skeletons />
                ) : (
                    songs.map((obj, index) => (
                        <SongEntity
                            artist={obj.artist}
                            title={obj.title}
                            cover={obj.album?.thumb?.photo_68}
                            onClick={() => play(`${obj.owner_id}_${obj.id}`)}
                            key={index}
                        />
                    ))
                )}
            </List>
        </Box>
    );
}

const SongEntity = (props: {
    title: string;
    artist: string;
    cover: string;
    onClick: () => void;
}) => (
    <>
        <ListItem button onClick={props.onClick}>
            <ListItemAvatar>
                <Avatar src={props.cover} />
            </ListItemAvatar>
            <ListItemText primary={props.title} secondary={props.artist} />
        </ListItem>
        <Divider />
    </>
);

const Skeletons = () => {
    return (
        <>
            {[...Array(8)].map(() => (
                <>
                    <ListItem>
                        <ListItemAvatar>
                            <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Skeleton variant="text" width={200} />}
                            secondary={<Skeleton variant="text" width={200} />}
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </>
    );
};

export default MyMusic;
