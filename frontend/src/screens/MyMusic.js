import React from "react";
import { Box } from "@mui/system";
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSongAction } from "../store/currentSongReducer";

const sxStyles = {
    mainList: {
        marginLeft: "20px"
    }
}

function MyMusic(){
    const music = [
        {
            valid: true,
            name: "Sample music",
            artist: "Unknown",
            artwork: "https://i.ytimg.com/vi/J1gnPiQ5N_M/maxresdefault.jpg",
            url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
        },
        {
            valid: true,
            name: "Example",
            artist: "SoundHelix",
            artwork: "https://res.cloudinary.com/demo/image/upload/sample.gif",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
        }
    ]

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const currentSong = useSelector(state => state.currentSong)

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const play = (song) => {
        dispatch(updateSongAction(song))
        console.log(currentSong)
    }

    return(
        <Box>
            <List>
                {
                    loading ? <Skeletons /> : music.map((obj, index) => (
                        <MusicEntity musicData={obj} action={play} key={index} />
                    ))
                }
            </List>
        </Box>
    )
}

const MusicEntity = ({musicData, action, key}) => (
    <>
        <ListItem button onClick={() => action(musicData)} key={key}>
            <ListItemAvatar>
                <Avatar src={musicData.artwork} />
            </ListItemAvatar>
            <ListItemText primary={musicData.name} secondary={musicData.artist} />
        </ListItem>
        <Divider />
    </>
)

const Skeletons = () => {
    const Entity = () => (
    <>
        <ListItem>
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton variant="text" width={200} />} secondary={<Skeleton variant="text" width={200} />} />
        </ListItem>
        <Divider />
    </>
    )
    let rows = []
    for (let i = 0; i < 8; i++) {
        rows.push(<Entity />)
    }
    return(rows)
}

export default MyMusic
