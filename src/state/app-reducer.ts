export type AppReducerType = {
    status: AppProgressStatusType
    error: string | null
}
export type AppProgressStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = ReturnType<typeof setErrorMessage> | ReturnType<typeof setProgressStatus>

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

export const setErrorMessage = (errorMessage: string | null) => ({type: 'APP/SET-ERROR', error: errorMessage} as const)
export const setProgressStatus = (status: AppProgressStatusType) => ({type: 'APP/SET-STATUS', status} as const)
