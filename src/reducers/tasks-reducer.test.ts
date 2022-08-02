import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
    UpdateDomainModelTaskType,
    updateTaskAC
} from "./tasks-reducer";
import {addNewTodolistAC, deleteTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let startTasks: TasksStateType = {}

beforeEach(() => {
    startTasks = {
        'toDoListId1': [
            {
                todoListId: 'toDoListId1', id: '1', title: 'HTML&CSS', status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            },
            {
                todoListId: 'toDoListId1', id: '2', title: "JavaScript", status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            },
            {
                todoListId: 'toDoListId1', id: '1', title: "React", status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            },
            {
                todoListId: 'toDoListId1', id: '1', title: "Redux", status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            }
        ],
        'toDoListId2': [
            {
                todoListId: 'toDoListId2', id: '1', title: 'Notebook', status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            },
            {
                todoListId: 'toDoListId2', id: '2', title: "Cake", status: TaskStatuses.New, priority:
                TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
            }
        ]
    }
})

test('remove task', () => {
    const finalTasks = tasksReducer(startTasks, removeTaskAC({toDoListId: "toDoListId2", id: '1'}))

    expect(finalTasks["toDoListId1"].length).toBe(4)
    expect(finalTasks["toDoListId2"].length).toBe(1)
    expect(startTasks["toDoListId2"].length).toBe(2)
})

test('add new task', () => {
    const task1 = {
        todoListId: 'toDoListId2', id: '3', title: 'Chocolate', status: TaskStatuses.New, priority:
        TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
    }
    const finalTasks = tasksReducer(startTasks, addTaskAC({task: task1}))

    expect(finalTasks["toDoListId1"].length).toBe(4)
    expect(finalTasks["toDoListId2"].length).toBe(3)
    expect(finalTasks["toDoListId2"][0].title).toBe('Chocolate')
    expect(startTasks["toDoListId2"].length).toBe(2)
})

test('change task title', () => {
    const taskModel: UpdateDomainModelTaskType = {title: 'Milk'}
    const finalTasks = tasksReducer(startTasks, updateTaskAC({
        toDoListId: "toDoListId2",
        taskId: '2',
        model: taskModel
    }))

    expect(finalTasks["toDoListId1"].length).toBe(4)
    expect(finalTasks["toDoListId2"].length).toBe(2)
    expect(finalTasks["toDoListId2"][1].title).toBe('Milk')
    expect(startTasks["toDoListId2"].length).toBe(2)
})

test('new property with new array should be added when new todolist is added', () => {

    const newTodolist = {
        id: 'toDoListId3',
        addedDate: '',
        order: 0,
        title: 'title is no matter'
    }
    const finalTasks = tasksReducer(startTasks, addNewTodolistAC({todolist: newTodolist}))

    const keys = Object.keys(finalTasks)
    const newKey = keys.find(k => k !== "toDoListId1" && k !== "toDoListId2")
    if (!newKey) {
        throw new Error("new key is not added")
    }

    expect(keys.length).toBe(3)
    expect(finalTasks[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const finalTasks = tasksReducer(startTasks, deleteTodolistAC({todolistId: 'toDoListId2'}))
    const keys = Object.keys(finalTasks)

    expect(keys.length).toBe(1)
    expect(finalTasks['toDoListId2']).toBeUndefined()
})