import React from "react";
import {Slider, Grid, IconButton, Typography, Box, Avatar, LinearProgress, Stack} from "@mui/material"
import { Icon24PlayCircle, Icon24SkipBack, Icon24SkipForward, Icon24PauseCircle, Icon24Shuffle, Icon24Repeat, Icon24RepeatOne } from '@vkontakte/icons';
import { useSelector } from "react-redux";
import { Icon24Volume } from '@vkontakte/icons';
import { Icon24Mute } from '@vkontakte/icons';

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
        color: "#0077ff",
        cursor: "pointer"
    },
    
    functionButton: {
        marginTop: "-8px",
        marginLeft: "3px",
        marginRight: "3px"
    },
    positiveFunctionButton: {
        paddingTop: "-10px",
        color: "#0077ff"
    },
    volContainer: {
        marginTop: "1em",
        position: "absolute", 
        right: "1em", 
        height: "8em"
    },
    loading: {
        marginLeft: "1em",
        marginRight: "1em",
        width: "30em",
        marginTop: "0.9em"
    }
}

function Player() {
    const currentSong = useSelector(state => state.currentSong)
    
    const [audioContext, setAudioContext] = React.useState(null)
    const [audioElem, setAudioElem] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    
    const [repeatMode, setRepeatMode] = React.useState(0)
    const [shuffle, setShuffle] = React.useState(false)
    const [playState, setPlayState] = React.useState(false)
    const [timingValue, setTimingValue] = React.useState(0)
    const [volume, setVolume] = React.useState(1)
    const [previousVolume, setPreviousVolume] = React.useState(0)

    const [duration, setDuration] = React.useState(0)
    const [songName, setSongName] = React.useState("")
    const [songArtist, setSongArtist] = React.useState("")
    const [artworkURL, setArtworkURL] = React.useState("")
    
    
    React.useEffect(() => {
        const AudioCTX = new AudioContext()
        const audio = new Audio()
        const track = AudioCTX.createMediaElementSource(audio)
        
        audio.crossOrigin = "anonymous"
        track.connect(AudioCTX.destination)
        setAudioContext(AudioCTX)
        setAudioElem(audio)
    }, [])

    React.useEffect(() => {
        if (currentSong.name && audioContext) {
            setPlayState(false)

            setSongName(currentSong.name)
            setSongArtist(currentSong.artist)
            setArtworkURL(currentSong.artwork)

            audioElem.setAttribute("src", currentSong.url)
            
            audioElem.onplaying = () => setLoading(false)
            audioElem.onwaiting = () => setLoading(true)
            audioElem.ontimeupdate = () => {setTimingValue(Math.floor(audioElem.currentTime))}
            audioElem.onloadeddata = () => {
                audioElem.play()
                setPlayState(true)
                setLoading(false)
                setDuration(Math.floor(audioElem.duration))
            }
        }

    }, [currentSong])

    const displayTime = (value) => {
        let seconds = value%60;
        return Math.floor(value/60) + ":" + ((seconds < 10) ? "0"+seconds : seconds) 
    }

    const onVolSet = (val) => {
        setVolume(val)
        audioElem.volume = val
    }

    const onPlay = () => {
        setPlayState(true)
        audioElem.play()
    }

    const onPause = () => {
        setPlayState(false)
        audioElem.pause()
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


    if (!currentSong.name) {
        return (<PlayerNotAvailable/>)
    } else {
        return(
            <Grid container spacing={1} alignContent="center" alignItems={"center"} direction="column">
                <Grid item>
                    <Stack direction={"column"} sx={sxStyles.volContainer} spacing={2}>
                        <Slider
                            orientation="vertical" min={0} max={1} step={0.1} value={volume} size="small"
                            onChange={(e, v) => onVolSet(v)}
                        />
                        {
                            (volume === 0) ? (
                                <Icon24Mute style={sxStyles.positiveButton} onClick={() => {onVolSet(previousVolume)}}/>
                            ):(
                                <Icon24Volume style={sxStyles.positiveButton} onClick={() => {
                                    setPreviousVolume(volume)
                                    onVolSet(0)
                                }}/>
                            )
                        }
                    </Stack>

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
                                <IconButton size="large" onClick={onPause}><Icon24PauseCircle style={sxStyles.positiveButton}/></IconButton>
                            ) : (
                                <IconButton size="large" onClick={onPlay} disabled={loading}><Icon24PlayCircle style={sxStyles.positiveButton}/></IconButton>
                            )
                        }
    
                        <IconButton size="large"><Icon24SkipForward style={sxStyles.positiveButton}/></IconButton>
                    </Box>
                </Grid>
    
                <Grid item>
                    <Box sx={sxStyles.timeContainer} id="timeContainer">
                        {
                            (repeatMode === 2) ? (
                                <IconButton size="large" onClick={onRepeat} sx={sxStyles.functionButton} disabled={loading}>
                                    <Icon24RepeatOne style={sxStyles.positiveButton}/>
                                </IconButton>
                            ) : (
                                <IconButton size="large" onClick={onRepeat} sx={sxStyles.functionButton} disabled={loading}>
                                    <Icon24Repeat style={(repeatMode === 1) ? sxStyles.positiveButton : null}/>
                                </IconButton>
                            )
                        }
    
                        <Typography variant="overline">{displayTime(timingValue)}</Typography>
                        {
                            (loading) ? (
                                <LinearProgress sx={sxStyles.loading} size="small"/>
                            ) : (
                                <Slider
                                    key={timingValue} size="small" min={0} max={duration}
                                    defaultValue={timingValue}
                                    onChange={() => audioElem.pause()}
                                    onChangeCommitted={(e, v) => {
                                        audioElem.play()
                                        setTimingValue(v)
                                        audioElem.currentTime = v
                                    }}
                                    valueLabelFormat={displayTime}
                                    sx={sxStyles.trackSlider}
                                    valueLabelDisplay="auto"
                                />
                            )
                        }
                        <Typography variant="overline" sx={sxStyles.rightTimingValue}>{"−" + displayTime(duration - timingValue)}</Typography>
    
                        <IconButton size="large" onClick={onShuffle} sx={sxStyles.functionButton} disabled={loading}>
                            <Icon24Shuffle style={(shuffle) ? sxStyles.positiveButton : null}/>
                        </IconButton>
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