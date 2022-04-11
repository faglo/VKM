import React from "react";
import { Box } from "@mui/system";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

function Settings(){
    const settings = [
        {
            name: "Logout",
            action: null,
        }
    ]

    return(
        <Box>
            <List>
                {
                    settings.map((obj, i) => (
                        <>
                            <ListItem button onClick={() => obj.action()} key={i}>
                                {/* <ListItemAvatar>
                                    <IconButton>
                                        <Avatar src={obj.artwork} sx={sxStyles.iconButton}/>
                                    </IconButton>
                                </ListItemAvatar> */}
                                <ListItemText primary={obj.name} secondary={obj.artist}/>
                            </ListItem>
                            <Divider variant="insert"/>
                        </>
                    ))
                }
            </List>
        </Box>
    )
}

export default Settings;
