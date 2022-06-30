import {appReducer, AppReducerType, setErrorMessage, setProgressStatus} from "./app-reducer";

let startState: AppReducerType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('change error message', () => {
    const correctState = appReducer(startState, setErrorMessage('error message'))

    expect(correctState.error).toBe('error message')
})
test('change status', () => {
    const correctState = appReducer(startState, setProgressStatus('succeeded'))

    expect(correctState.status).toBe('succeeded')
})
