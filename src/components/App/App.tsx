import React, {useEffect} from 'react';
import classes from './App.module.css';
import {AppBar, Button, CircularProgress, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsCatalog} from "../../features/Todolists/TodolistCatalog/TodolistCatalog";
import {CustomizedSnackbars} from "../ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC} from "../../reducers/app-reducer";
import {LinearProgress} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {logoutUserTC} from "../Login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

function App() {
    let status = useAppSelector(state => state.app.status)
    let isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const logoutHandler = () => dispatch(logoutUserTC())

    useEffect(() => {
        dispatch(initializeAppTC())
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



