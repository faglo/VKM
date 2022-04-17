import { Box, Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import Player from "./Player";
import Login from "./screens/Login";
import MyMusic from "./screens/MyMusic";
import Search from "./screens/Search";
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
};

function App() {
    const screens = [
        {
            name: "My music",
            screen: <MyMusic />,
        },
        {
            name: "Search",
            screen: <Search />,
        },
        {
            name: "Settings",
            screen: <Settings />,
        },
    ];

    const [currentScreen, setCurrentScreen] = React.useState(0);
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    React.useEffect(() => {}, []);
    if (isLoggedIn) {
        return (
            <Box>
                <Tabs
                    value={currentScreen}
                    onChange={(e, v) => setCurrentScreen(v)}
                    variant="fullWidth"
                >
                    {screens.map((obj, i) => (
                        <Tab label={obj.name} value={i} key={i} />
                    ))}
                </Tabs>
                <Box component={"main"}>{screens[currentScreen].screen}</Box>
                <Box sx={sxStyles.player}>
                    <Divider />
                    <Player />
                </Box>
            </Box>
        );
    } else {
        return <Login />;
    }
}

export default App;
