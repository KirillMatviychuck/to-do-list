import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {setAppProgressStatus, setIsInitialized} from "../../state/app-reducer";

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

export const loginUserTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authUser(true))
                dispatch(setAppProgressStatus('idle'))
            }
        })
}
export const logoutUserTC = () => (dispatch: Dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authUser(false))
                dispatch(setAppProgressStatus('succeeded'))
            }
        })
}

export type AuthInitialStateType = typeof initialState
type AuthActionType =
    | ReturnType<typeof authUser>

