import {appReducer, AppReducerType, setAppErrorMessage, setAppProgressStatus} from "./app-reducer";

let startState: AppReducerType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('change error message', () => {
    const correctState = appReducer(startState, setAppErrorMessage({errorMessage: 'error message'}))

    expect(correctState.error).toBe('error message')
})
test('change status', () => {
    const correctState = appReducer(startState, setAppProgressStatus({status: 'succeeded'}))

    expect(correctState.status).toBe('succeeded')
})
