import React = require("react");
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
} from "@mui/material";
import { Icon24Play } from "@vkontakte/icons";
import { useAppSelector } from "../store/hooks";
import { Audio } from "../wailsjs/go/models";

function SongList({ songs, loading }) {
    const currentSong = useAppSelector((state) => state.currentSong);
    return (
        <List sx={{ maxHeight: "calc(100vh - 8vh)", overflow: "auto" }}>
            {loading ? (
                <Skeletons />
            ) : (
                songs.map((obj, index) => (
                    <SongEntity
                        audio={obj}
                        key={index}
                        playing={currentSong.id === obj.id}
                    />
                ))
            )}
        </List>
    );
}

const SongEntity = (props: { audio: Audio; playing: boolean }) => (
    <>
        <ListItem
            button
            onClick={() => {
                props.playing
                    ? window.go.app.Application.Pause()
                    : window.go.app.Application.Play(
                          `${props.audio.owner_id}_${props.audio.id}`
                      );
            }}
        >
            {props.playing ? (
                <Avatar sx={{ marginRight: "1em" }}>
                    <Icon24Play style={{ color: "#0077ff" }} />
                </Avatar>
            ) : (
                <ListItemAvatar>
                    <Avatar src={props.audio.album?.thumb?.photo_68} />
                </ListItemAvatar>
            )}
            <ListItemText
                primary={props.audio.title}
                secondary={props.audio.artist}
            />
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

export default SongList;
