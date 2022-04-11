import React from "react";
import {Typography, Container, Grid, Snackbar, TextField, Dialog, DialogTitle, DialogContent, Button} from "@mui/material"
import { LoadingButton } from "@mui/lab";

function Login(){
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [captcha, setCaptcha] = React.useState(null);
    const [captchaValue, setCaptchaValue] = React.useState("");
    const [twoFactorCode, setTwoFactorCode] = React.useState("");
    const [isTwoFactor, setIsTwoFactor] = React.useState(false);

    const onLogin = () => {
        console.log(login, password);
    }

    const onCaptchaSubmit = () => {
        console.log(captchaValue);
    }

    const onTwoFactorSubmit = () => {
        console.log(twoFactorCode);
    }

    const onCaptha = (captchaObj) => {
        setCaptcha(captchaObj);
    }

    const onTwoFactor = () => {
        setIsTwoFactor(true);
    }

    
    return(
        <Container component={"main"} maxWidth="xs" sx={{paddingTop: 8}}>
            <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" xs={12}>Sign in</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Login" value={login} onChange={(e) => setLogin(e.target.value)} variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={isLoading}
                        fullWidth
                        onClick={onLogin}
                    >Sign in</LoadingButton>
                </Grid>
            </Grid>

            <Snackbar 
                open={error.length > 0} 
                message={error} 
                duration={5000}
                onClose={() => setError("")}
                severity="error"
            />

            <Dialog maxWidth="xs" open={captcha === null}>
                <DialogTitle>Captcha required</DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <img src={captcha} alt="captcha" width={"100%"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField placeholder="Captcha" variant="outlined" fullWidth value={captchaValue} onChange={(e) => setCaptchaValue(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth disabled={captchaValue.length === 0} onClick={onCaptchaSubmit}>Submit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth onClick={() => {setCaptcha(""); setIsLoading(false)}}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog maxWidth="xs" open={isTwoFactor}>
                <DialogTitle>Two-Factor authorization</DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <TextField placeholder="Code" variant="outlined" fullWidth value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth disabled={twoFactorCode.length === 0} onClick={onTwoFactorSubmit}>Submit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth onClick={() => {setIsTwoFactor(false); setIsLoading(false)}}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default Login;