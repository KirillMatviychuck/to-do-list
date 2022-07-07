import {authAPI} from "../api/todolists-api";
import {authUser} from "../components/Login/auth-reducer";
import {AppThunk} from "../store/store";

const initialState: AppReducerType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: AppReducerType = initialState, action: AppReducerActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppErrorMessage = (errorMessage: string | null) => ({
    type: 'APP/SET-ERROR',
    error: errorMessage
} as const)
export const setAppProgressStatus = (status: AppProgressStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.initialize()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authUser(true))
            }
            dispatch(setIsInitialized(true))
        })
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
