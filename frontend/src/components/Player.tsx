import {
    Avatar,
    Box,
    Grid,
    IconButton,
    LinearProgress,
    Slider,
    Typography,
} from "@mui/material";
import {
    Icon24PauseCircle,
    Icon24PlayCircle,
    Icon24Repeat,
    Icon24RepeatOne,
    Icon24Shuffle,
    Icon24SkipBack,
    Icon24SkipForward,
} from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

const sxStyles = {
    row: {
        display: "flex",
        flexDirection: "row",
    },
    trackSlider: {
        marginLeft: "1em",
        marginRight: "1em",
        width: "30em",
        marginTop: "2px",
        color: "#0077ff",
    },
    infoTextContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "1em",
    },

    positiveButton: {
        color: "#0077ff",
        cursor: "pointer",
    },
    loading: {
        marginLeft: "1em",
        marginRight: "1em",
        width: "30em",
        marginTop: "0.9em",
    },
    functionButtonTopMargin: {
        marginTop: "-3px",
    },
};

function Player() {
    const currentSong = useAppSelector((state) => state.currentSong);
    const [loading, setLoading] = useState(false);

    const [repeatMode, setRepeatMode] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const [playState, setPlayState] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);
    const [songName, setSongName] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [artworkURL, setArtworkURL] = useState("");

    useEffect(() => {
        if (currentSong.name) {
            setPlayState(false);

            setSongName(currentSong.name);
            setSongArtist(currentSong.artist);
            setArtworkURL(currentSong.artwork);
            setLoading(false);
        }
    }, [currentSong]);

    const displayTime = (value) => {
        let seconds = value % 60;
        return (
            Math.floor(value / 60) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };

    const onPlay = () => {
        setPlayState(true);
    };

    const onPause = () => {
        setPlayState(false);
    };

    const onShuffle = () => {
        setShuffle(!shuffle);
    };

    const onRepeat = () => {
        if (repeatMode === 0) {
            setRepeatMode(1);
        } else if (repeatMode === 1) {
            setRepeatMode(2);
        } else {
            setRepeatMode(0);
        }
    };

    const RepeatButton = () => {
        const margin = "0.5em";
        if (repeatMode === 1) {
            return (
                <IconButton
                    onClick={onRepeat}
                    sx={{
                        marginRight: margin,
                        ...sxStyles.functionButtonTopMargin,
                    }}
                    disableRipple
                >
                    <Icon24RepeatOne style={sxStyles.positiveButton} />
                </IconButton>
            );
        } else {
            return (
                <IconButton
                    onClick={onRepeat}
                    sx={{
                        marginRight: margin,
                        ...sxStyles.functionButtonTopMargin,
                    }}
                    disableRipple
                >
                    <Icon24Repeat
                        style={
                            repeatMode === 0 ? null : sxStyles.positiveButton
                        }
                    />
                </IconButton>
            );
        }
    };

    const ShuffleButton = () => {
        return (
            <IconButton
                onClick={onShuffle}
                sx={{
                    marginLeft: "0.5em",
                    ...sxStyles.functionButtonTopMargin,
                }}
                disableRipple
            >
                <Icon24Shuffle
                    style={shuffle ? sxStyles.positiveButton : null}
                />
            </IconButton>
        );
    };

    const PlayButton = () => {
        if (playState) {
            return (
                <IconButton size="large" onClick={onPause} disableRipple>
                    <Icon24PauseCircle style={sxStyles.positiveButton} />
                </IconButton>
            );
        } else {
            return (
                <IconButton
                    size="large"
                    onClick={onPlay}
                    disabled={loading}
                    disableRipple
                >
                    <Icon24PlayCircle style={sxStyles.positiveButton} />
                </IconButton>
            );
        }
    };

    if (!currentSong.name) {
        return <PlayerNotAvailable />;
    } else {
        return (
            <Grid
                container
                spacing={2}
                alignContent="center"
                alignItems={"center"}
                direction="row"
            >
                <Grid item>
                    <Avatar
                        variant="rounded"
                        src={artworkURL}
                        sx={{ marginLeft: "1em" }}
                    />
                </Grid>
                <Grid item>
                    <Box sx={{ width: "7em" }}>
                        <Typography variant="subtitle1" noWrap>
                            {songName}
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            {songArtist}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ marginTop: "0.3em" }}>
                        <IconButton size="large">
                            <Icon24SkipBack style={sxStyles.positiveButton} />
                        </IconButton>

                        <PlayButton />

                        <IconButton size="large">
                            <Icon24SkipForward
                                style={sxStyles.positiveButton}
                            />
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ ...sxStyles.row, marginTop: "0.5em" }}>
                        <RepeatButton />

                        <Typography variant="overline">
                            {displayTime(currentTime)}
                        </Typography>
                        {loading ? (
                            <LinearProgress sx={sxStyles.trackSlider} />
                        ) : (
                            <Slider
                                key={currentTime}
                                size="medium"
                                min={0}
                                max={duration}
                                defaultValue={currentTime}
                                valueLabelFormat={displayTime}
                                valueLabelDisplay="auto"
                                sx={sxStyles.trackSlider}
                            />
                        )}
                        <Typography variant="overline">
                            {"−" + displayTime(duration - currentTime)}
                        </Typography>

                        <ShuffleButton />
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

const PlayerNotAvailable = () => (
    <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ width: "100%", paddingTop: "0.5em" }}>
            Nothing to play
        </Typography>
    </Box>
);

export default Player;
