import {
    addTaskTC,
    deleteTaskTC, fetchTasksTC,
    tasksReducer,
    TasksStateType,
    UpdateDomainModelTaskType, updateTaskTC,
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
test('task should be added for todolist', () => {
    const action = fetchTasksTC.fulfilled({tasks: startTasks['toDoListId1'], todolistId: 'toDoListId1'},
        'requestId', 'toDoListId1')

    const endState = tasksReducer({
        'toDoListId2': [],
        'toDoListId1': [],
    }, action)

    expect(endState['toDoListId1'].length).toBe(4)
    expect(endState['toDoListId2'].length).toBe(0)
})


test('remove task', () => {
    const payload = {todoListId: "toDoListId2", id: '1'};
    const finalTasks = tasksReducer(startTasks, deleteTaskTC.fulfilled(payload, 'requestId', payload))

    expect(finalTasks["toDoListId1"].length).toBe(4)
    expect(finalTasks["toDoListId2"].length).toBe(1)
    expect(startTasks["toDoListId2"].length).toBe(2)
})

test('add new task', () => {
    const task1 = {
        todoListId: 'toDoListId2', id: '3', title: 'Chocolate', status: TaskStatuses.New, priority:
        TaskPriorities.Low, startDate: '', deadline: '1', description: 'one', order: 0, addedDate: ''
    }
    const payload = {task: task1};
    const finalTasks = tasksReducer(startTasks, addTaskTC.fulfilled(payload, 'requestId', {
        todoListId: task1.todoListId,
        title: task1.title
    }))

    expect(finalTasks["toDoListId1"].length).toBe(4)
    expect(finalTasks["toDoListId2"].length).toBe(3)
    expect(finalTasks["toDoListId2"][0].title).toBe('Chocolate')
    expect(startTasks["toDoListId2"].length).toBe(2)
})

test('change task title', () => {
    const taskModel: UpdateDomainModelTaskType = {title: 'Milk'}
    const payload = {
        todoListId: "toDoListId2",
        taskId: '2',
        domainModel: taskModel
    };
    const finalTasks = tasksReducer(startTasks, updateTaskTC.fulfilled(payload, 'requestId', payload))

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