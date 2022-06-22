export {}
// import {userReducer} from './user-reducer'
//
// test('ureducer should increment only age', () => {
//     const startState = {age: 20, childrenCount: 2, name: 'Dimon'}
//     const changedState = userReducer(startState, {type: 'INCREMENT-AGE'})
//
//     expect(changedState.age).toBe(21)
//     expect(changedState.childrenCount).toBe(2)
// })
//
// test('ureducer should increment only childrenCount', () => {
//     const startState = {age: 20, childrenCount: 2, name: 'Dimon'}
//     const changedState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
//
//     expect(changedState.age).toBe(20)
//     expect(changedState.childrenCount).toBe(3)
// })
//
// test('ureducer should change name', () => {
//     const startState = {age: 20, childrenCount: 2, name: 'Dimon'}
//     const newName = 'Vasya'
//
//     const changedState = userReducer(startState, {type: 'CHANGE-NAME', name: newName})
//
//     expect(changedState.age).toBe(20)
//     expect(changedState.childrenCount).toBe(2)
//     expect(changedState.name).toBe('Vasya')
// })