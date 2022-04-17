// @ts-nocheck
import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import CaptchaHandler from "../components/CaptchaHandler";

function Login() {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [captcha, setCaptcha] = React.useState("");
    const [captchaValue, setCaptchaValue] = React.useState("");
    const [twoFactorCode, setTwoFactorCode] = React.useState("");
    const [isTwoFactor, setIsTwoFactor] = React.useState(false);

    return (
        <Container component={"main"} maxWidth="xs" sx={{ paddingTop: 8 }}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" xs={12}>
                        Sign in
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton loading={isLoading} fullWidth>
                        Sign in
                    </LoadingButton>
                </Grid>
            </Grid>

            <Snackbar
                open={error.length > 0}
                message={error}
                onClose={() => setError("")}
                autoHideDuration={3000}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            <CaptchaHandler
                value={captchaValue}
                url={captcha}
                valSetter={setCaptchaValue}
                onCancel={() => {
                    setCaptcha("");
                    setCaptchaValue("");
                }}
            />
            <Dialog maxWidth="xs" open={isTwoFactor}>
                <DialogTitle>Two-Factor authorization</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Code"
                                variant="outlined"
                                fullWidth
                                value={twoFactorCode}
                                onChange={(e) =>
                                    setTwoFactorCode(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                disabled={twoFactorCode.length === 0}
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    setIsTwoFactor(false);
                                    setIsLoading(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default Login;
