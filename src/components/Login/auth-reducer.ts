import {authAPI} from "../../api/todolists-api";
import {setAppErrorMessage, setAppProgressStatus} from "../../reducers/app-reducer";
import {AppThunk} from "../../store/store";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionType): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/AUTH-USER':
            return {...state, isLoggedIn: action.authValue}
        default:
            return state
    }
}

export const authUser = (authValue: boolean) => ({type: 'AUTH/AUTH-USER', authValue} as const)

export const loginUserTC = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    try {
        const data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(authUser(true))
            dispatch(setAppProgressStatus('idle'))
        }
        if (data.resultCode) {
            dispatch(setAppErrorMessage(data.messages[0]))
            dispatch(setAppProgressStatus('failed'))
        }
    } catch (error) {
        dispatch(setAppErrorMessage(`${error}`))
    }
}
export const logoutUserTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(authUser(false))
            dispatch(setAppProgressStatus('succeeded'))
        }
    } catch (error) {
        dispatch(setAppProgressStatus('failed'))
        dispatch(setAppErrorMessage(`${error}`))
    }
}

export type AuthInitialStateType = typeof initialState
export type AuthActionType =
    | ReturnType<typeof authUser>

