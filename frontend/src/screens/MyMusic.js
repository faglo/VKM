import React from "react";
import { Box } from "@mui/system";
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
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
            name: "Song 2",
            artist: "Blur",
            artwork: "https://www.youredm.com/wp-content/uploads/2014/01/wick_it_blur_zps3eb23afb.jpg"
        },
        {
            valid: true,
            name: "Песенка про путина",
            artist: "Сам сделал",
            artwork: "https://i.ytimg.com/vi/J1gnPiQ5N_M/maxresdefault.jpg"
        },
        {
            valid: true,
            name: "Be Nice 2 Me",
            artist: "Bladee",
            artwork: "https://cdn.albumoftheyear.org/album/237244-be-nice-2-me.jpg"
        },
        {
            valid: true,
            name: "Fuck Forever",
            artist: "Babyshambles",
            artwork: "https://images.recordsale.de/600/600/babyshambles-fuck-forever-1.jpg"
        },
        {
            valid: true,
            name: "Savage",
            artist: "Paul Flint",
            artwork: "https://i1.sndcdn.com/artworks-000178640584-kie7ij-t500x500.jpg"
        }
    ]
    const dispatch = useDispatch()
    const currentSong = useSelector(state => state.currentSong)

    React.useEffect(() => {
        console.log(currentSong)
    }, [currentSong])

    const play = (song) => {
        dispatch(updateSongAction(song))
        console.log(currentSong)
    }

    return(
        <Box>
            <List>
                {
                    music.map((obj, i) => (
                        <>
                            <ListItem button onClick={() => play(obj)}>
                                <ListItemAvatar>
                                    <IconButton>
                                        <Avatar src={obj.artwork} sx={sxStyles.iconButton}/>
                                    </IconButton>
                                </ListItemAvatar>
                                <ListItemText primary={obj.name} secondary={obj.artist}/>
                            </ListItem >
                            <Divider variant="insert"/>
                        </>
                    ))
                }
            </List>
        </Box>
    )
}

export default MyMusic;
