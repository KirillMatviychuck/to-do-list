export type AppReducerType = {
    status: AppProgressStatusType
    error: string | null
}
export type AppProgressStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = SetAppErrorMessageType | SetAppProgressStatusType
export type SetAppProgressStatusType = ReturnType<typeof setAppProgressStatus>
export type SetAppErrorMessageType = ReturnType<typeof setAppErrorMessage>

const initialState: AppReducerType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: AppReducerType = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorMessage = (errorMessage: string | null) => ({type: 'APP/SET-ERROR', error: errorMessage} as const)
export const setAppProgressStatus = (status: AppProgressStatusType) => ({type: 'APP/SET-STATUS', status} as const)
