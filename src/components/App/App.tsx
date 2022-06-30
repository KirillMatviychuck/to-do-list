import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsCatalog} from "../../features/Todolists/TodolistCatalog/TodolistCatalog";
import {CustomizedSnackbars} from "../ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {AppProgressStatusType} from "../../state/app-reducer";
import {LinearProgress} from "@mui/material";

function App() {
    let status = useSelector<AppRootStateType, AppProgressStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <CustomizedSnackbars />
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={"secondary"}/>}
            <TodolistsCatalog />
        </div>
    );
}

export default App;



