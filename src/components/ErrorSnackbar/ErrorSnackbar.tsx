import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {setAppErrorMessage} from "../../reducers/app-reducer";
import {useAppDispatch} from "../../store/hooks";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function CustomizedSnackbars() {
    // const [open, setOpen] = React.useState(true);
    //
    // const handleClick = () => {
    //     setOpen(true);
    // };
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorMessage(null))
       // setOpen(false);
    };
    let error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    let hasError = error !== null
    return (

            <Snackbar open={hasError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>

    );
}
