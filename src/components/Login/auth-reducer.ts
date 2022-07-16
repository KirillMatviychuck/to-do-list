import {authAPI} from "../../api/todolists-api";
import {setAppErrorMessage, setAppProgressStatus} from "../../reducers/app-reducer";
import {AppThunk} from "../../store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authUser(state, action: PayloadAction<{ authValue: boolean }>) {
            state.isLoggedIn = action.payload.authValue
        }
    }
})

export const authReducer = authSlice.reducer
export const {authUser} = authSlice.actions


export const loginUserTC = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(authUser({authValue: true}))
            dispatch(setAppProgressStatus({status: 'idle'}))
        }
        if (data.resultCode) {
            dispatch(setAppErrorMessage({errorMessage: data.messages[0]}))
            dispatch(setAppProgressStatus({status: 'failed'}))
        }
    } catch (error) {
        dispatch(setAppErrorMessage({errorMessage: `${error}`}))
        dispatch(setAppProgressStatus({status: 'failed'}))
    }
}
export const logoutUserTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus({status: 'loading'}))
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(authUser({authValue: false}))
            dispatch(setAppProgressStatus({status: 'succeeded'}))
        }
    } catch (error) {
        dispatch(setAppProgressStatus({status: 'failed'}))
        dispatch(setAppErrorMessage({errorMessage: `${error}`
    }))
    }
}

export type AuthActionType =
    | ReturnType<typeof authUser>

