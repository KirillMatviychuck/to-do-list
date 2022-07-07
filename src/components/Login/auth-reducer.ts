import {authAPI} from "../../api/todolists-api";
import {setAppProgressStatus} from "../../reducers/app-reducer";
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

export const loginUserTC = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    dispatch(setAppProgressStatus('loading'))
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authUser(true))
                dispatch(setAppProgressStatus('idle'))
            }
        })
}
export const logoutUserTC = (): AppThunk => (dispatch) => {
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
export type AuthActionType =
    | ReturnType<typeof authUser>

