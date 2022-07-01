import {appReducer, AppReducerType, setAppErrorMessage, setAppProgressStatus} from "./app-reducer";

let startState: AppReducerType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('change error message', () => {
    const correctState = appReducer(startState, setAppErrorMessage('error message'))

    expect(correctState.error).toBe('error message')
})
test('change status', () => {
    const correctState = appReducer(startState, setAppProgressStatus('succeeded'))

    expect(correctState.status).toBe('succeeded')
})
