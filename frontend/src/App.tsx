import { Box, Divider, Drawer, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, OutlinedInput, Typography } from "@mui/material";
import { Icon16Search, Icon28Music, Icon28Settings } from '@vkontakte/icons';
import { useEffect, useState } from "react";
import CaptchaHandler from "./components/CaptchaHandler";
import Player from "./components/Player";
import Login from "./screens/Login";
import MyMusic from "./screens/MyMusic";
import Settings from "./screens/Settings";

const sxStyles = {
    player: {
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
        height: "4em",
        paddingBottom: 0,
        marginBottom: 0,
        zIndex: 9999,
    },
    drawer: {
        width: 200,
    },
    positive: {
        color: "#0077ff",
    }
};

function App() {
    const screens = [
        {
            id: 0,
            name: "My music",
            icon: <Icon28Music style={sxStyles.positive} />,
            screen: <MyMusic />,
        },
        {
            id: 1,
            name: "Settings",
            icon: <Icon28Settings style={sxStyles.positive} />,
            screen: <Settings />,
        },
    ];

    const [currentScreen, setCurrentScreen] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [captcha, setCaptcha] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");

    useEffect(() => {}, []);
    if (isLoggedIn) {
        return (
            <Box sx={{display: "flex"}}>
                <Drawer sx={sxStyles.drawer} variant={"permanent"} anchor={"left"}>
                    <Grid container sx={sxStyles.drawer} spacing={1} justifyContent={"center"}>
                        <Grid item xs={11}>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection:"column" }}>
                                <Typography variant="h5">VKM</Typography>
                                <OutlinedInput
                                    size="small"
                                    fullWidth sx={{ margin: 1}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <Icon16Search style={sxStyles.positive} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>  
                            <List>
                                {
                                    screens.map((screen) => (
                                        <ListItem
                                            key={screen.id}
                                            onClick={() => setCurrentScreen(screen.id)}
                                            button
                                            selected={screen.id === currentScreen}
                                        >
                                            <ListItemIcon>
                                                {screen.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={screen.name} />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Drawer>
                <Box component={"main"} sx={{flexGrow: 1, paddingLeft: `calc(100% - ${sxStyles.drawer.width})`}}>
                    {screens[currentScreen].screen}
                </Box>
                <Box sx={sxStyles.player}>
                    <Player />
                </Box>
                <CaptchaHandler
                    value={captchaValue}
                    valSetter={setCaptchaValue}
                    url={captcha}
                    onCancel={() => {
                        setCaptcha("");
                        setCaptchaValue("");
                    }}
                    onSubmit={() => {}}
                />
            </Box>
        );
    } else {
        return <Login />;
    }
}

export default App;
