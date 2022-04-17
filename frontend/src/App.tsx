import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import CaptchaHandler from "./components/CaptchaHandler";
import Player from "./components/Player";
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
            id: 0,
            name: "My music",
            screen: <MyMusic />,
        },
        {
            id: 1,
            name: "Search",
            screen: <Search />,
        },
        {
            id: 2,
            name: "Settings",
            screen: <Settings />,
        },
    ];

    const [currentScreen, setCurrentScreen] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");

    useEffect(() => {}, []);
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
