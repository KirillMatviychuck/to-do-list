import {authAPI} from "../api/todolists-api";
import {authUser} from "../components/Login/auth-reducer";
import {AppThunk} from "../store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppReducerType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorMessage(state, action: PayloadAction<{ errorMessage: string | null }>) {
            state.error = action.payload.errorMessage
        },
        setAppProgressStatus(state, action: PayloadAction<{ status: AppProgressStatusType }>) {
            state.status = action.payload.status
        },
        setIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = appSlice.reducer
export const {setAppProgressStatus, setAppErrorMessage, setIsInitialized} = appSlice.actions

// Thunks
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const data = await authAPI.initialize()
        if (data.resultCode === 0) {
            dispatch(authUser({authValue: true}))
        }
        if (data.resultCode) {
            dispatch(setAppProgressStatus({status: 'failed'}))
        }
    } catch (error) {
        dispatch(setAppErrorMessage({errorMessage: `${error}`}))
    } finally {
        dispatch(setIsInitialized({value: true}))
    }
}

export type AppReducerType = {
    status: AppProgressStatusType
    error: string | null
    isInitialized: boolean
}
export type AppProgressStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerActionsType = SetAppErrorMessageType | SetAppProgressStatusType | SetIsInitializedType

export type SetAppProgressStatusType = ReturnType<typeof setAppProgressStatus>
export type SetAppErrorMessageType = ReturnType<typeof setAppErrorMessage>
export type SetIsInitializedType = ReturnType<typeof setIsInitialized>
