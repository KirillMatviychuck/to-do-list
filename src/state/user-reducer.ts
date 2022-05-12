export type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {
                ...state
            }
            newState.age += 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            throw new Error('Something going wrong')
    }
}
