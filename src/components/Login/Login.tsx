import {TextField} from "@mui/material";

export const Login = () => {
    return (
        <>
            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
        </>
    )
}