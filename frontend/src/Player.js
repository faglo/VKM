import React from "react";
import {Slider, Grid, IconButton, Typography, Box, Avatar} from "@mui/material"
import { Icon24PlayCircle, Icon24SkipBack, Icon24SkipForward, Icon24PauseCircle, Icon24Shuffle, Icon24Repeat, Icon24RepeatOne } from '@vkontakte/icons';
import { useSelector } from "react-redux";

const sxStyles = {
    timeContainer: {
        display: "flex",
        flexDirection: "row"
    },
    trackSlider: {
        marginLeft: "1em",
        marginRight: "1em",
        width: "30em",
        marginTop: "2px",
        color: "#0077ff"
    },

    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
    },

    infoContainer: {
        display: "flex",
        flexDirection: "row",
        paddingTop: "0.5em"
    },
    infoTextContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "1em",
        
    },

    positiveButton: {
        color: "#0077ff"
    },
    
    functionButton: {
        marginTop: "-8px",
        marginLeft: "3px",
        marginRight: "3px"
    },
    positiveFunctionButton: {
        paddingTop: "-10px",
        color: "#0077ff"
    }
}

function Player() {
    const currentSong = useSelector(state => state.currentSong)
    const [playable, setPlayable] = React.useState(false)
    const [playState, setPlayState] = React.useState(false)
    const [leftTimeCounter, setLeftTimeCounter] = React.useState(0)
    const [timingValue, setTimingValue] = React.useState(0)
    const [duration, setDuration] = React.useState(5*60 + 44)
    const [songName, setSongName] = React.useState("")
    const [songArtist, setSongArtist] = React.useState("")
    const [artworkURL, setArtworkURL] = React.useState("")
    const [shuffle, setShuffle] = React.useState(false)
    const [repeatMode, setRepeatMode] = React.useState(0)

    React.useEffect(() => {
        setSongName(currentSong.name)
        setSongArtist(currentSong.artist)
        setArtworkURL(currentSong.artwork)
        setPlayable(currentSong.valid)
    }, [currentSong])

    const displayTime = (value) => {
        let seconds = value%60;
        return Math.floor(value/60) + ":" + ((seconds < 10) ? "0"+seconds : seconds) 
    }

    const onPlay = () => {
        setPlayState(true)
    }

    const onPause = () => {
        setPlayState(false)
    }

    const onShuffle = () => {
        setShuffle(!shuffle)
    }

    const onRepeat = () => {
        if (repeatMode === 0) {
            setRepeatMode(1)
        } else if (repeatMode === 1) {
            setRepeatMode(2)
        } else {
            setRepeatMode(0)
        }
    }

    if (!playable) {
        return (<PlayerNotAvailable/>)
    } else {
        return(
            <Grid container spacing={1} alignContent="center" alignItems={"center"} direction="column">
                <Grid item>
                    <Box id="infoContainer" sx={sxStyles.infoContainer}>
                        <Avatar variant="rounded" src={artworkURL} sx={{height: "100%", paddingTop: "4px"}}/>
                        <Box sx={sxStyles.infoTextContainer}>
                            <Typography variant="subtitle1" noWrap>{songName}</Typography>
                            <Typography variant="subtitle2" noWrap sx={{cursor: "pointer"}}>{songArtist}</Typography>
                        </Box>
                    </Box>
                    
                </Grid>
                <Grid item>
                    <Box id="buttonsContainer" sx={sxStyles.buttonsContainer}>
                        <IconButton size="large"><Icon24SkipBack style={sxStyles.positiveButton}/></IconButton>
    
                        {
                            (playState) ? (
                                <IconButton size="large" onClick={onPause}><Icon24PlayCircle style={sxStyles.positiveButton}/></IconButton>
                            ) : (
                                <IconButton size="large" onClick={onPlay}><Icon24PauseCircle style={sxStyles.positiveButton}/></IconButton>
                            )
                        }
    
                        <IconButton size="large"><Icon24SkipForward style={sxStyles.positiveButton}/></IconButton>
                    </Box>
                </Grid>
    
                <Grid item>
                    <Box sx={sxStyles.timeContainer} id="timeContainer">
                        {
                            (repeatMode === 1) ? (
                                <IconButton size="large" onClick={onRepeat} sx={sxStyles.functionButton}><Icon24Repeat style={sxStyles.positiveButton}/></IconButton>
                            ) : (repeatMode === 2) ? (
                                <IconButton size="large" onClick={onRepeat} sx={sxStyles.functionButton}><Icon24RepeatOne style={sxStyles.positiveButton}/></IconButton>
                            ) : (
                                <IconButton size="large" onClick={onRepeat} sx={sxStyles.functionButton}><Icon24Repeat/></IconButton>
                            )
                        }
    
                        <Typography variant="overline">{displayTime(leftTimeCounter)}</Typography>
    
                        <Slider
                            size="small"
                            defaultValue={timingValue}
                            min={0}
                            max={duration}
                            onChangeCommitted={(e, v) => setLeftTimeCounter(v)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={displayTime}
                            sx={sxStyles.trackSlider}
                        />
    
                        <Typography variant="overline" sx={sxStyles.rightTimingValue}>{"−" + displayTime(duration - leftTimeCounter)}</Typography>
    
                        {
                            (shuffle) ? (
                                <IconButton size="large" onClick={onShuffle} sx={sxStyles.functionButton}><Icon24Shuffle style={sxStyles.positiveButton}/></IconButton>
                            ) : (
                                <IconButton size="large" onClick={onShuffle} sx={sxStyles.functionButton}><Icon24Shuffle /></IconButton>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        )
    }

}

const PlayerNotAvailable = () => (
    <Box sx={{textAlign: "center"}}>
        <Typography variant="h3" sx={{width: "100%", marginTop: "1em"}}>Nothing to play</Typography>
    </Box>
)

export default Player;