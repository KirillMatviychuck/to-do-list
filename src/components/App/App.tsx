import React, {useEffect} from 'react';
import classes from './App.module.css';
import {AppBar, Button, CircularProgress, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsCatalog} from "../../features/Todolists/TodolistCatalog/TodolistCatalog";
import {CustomizedSnackbars} from "../ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {AppProgressStatusType, initializeAppTC} from "../../state/app-reducer";
import {LinearProgress} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Login} from "../Login/Login";
import {logoutUserTC} from "../Login/auth-reducer";

function App() {
    let status = useSelector<AppRootStateType, AppProgressStatusType>(state => state.app.status)
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()
    const logoutHandler = () => dispatch(logoutUserTC() as any)

    useEffect(() => {
        dispatch(initializeAppTC() as any)
    }, [])

    if (!isInitialized) {
        debugger
        return <div className={classes.progressBar}><CircularProgress /></div>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <CustomizedSnackbars/>
                    <Toolbar className={classes.headerToolbar}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            List
                        </Typography>
                        <Button onClick={logoutHandler} color="inherit">Log out</Button>
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
                    <Routes>
                        <Route path={'/login'} element={<Login />}/>
                        <Route path={'/'} element={<TodolistsCatalog />}/>
                    </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;



