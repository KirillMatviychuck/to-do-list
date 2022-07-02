import {authReducer, authUser} from "./auth-reducer";

// beforeEach(() => {
//
// })

test('correct change isAuth value', () => {
    const startState = {
        isLoggedIn: false
    }
    const finalState = (authReducer(startState, authUser(true)))

    expect(finalState.isLoggedIn).toBeTruthy()
    expect(startState.isLoggedIn).toBeFalsy()
})