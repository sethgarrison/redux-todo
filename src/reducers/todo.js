// IMPORTED API METHODS
import {getTodos, createTodo, updateTodo, destroyTodo} from '../api/todoService'

// IMPORTED DISPATCH
import {showMessage} from './messages'

// INITIAL STATE OF REDUCER
const initState = {
    todos: [],
    currentTodo: ''
}

// LOCAL AND EXPORTED ACTION TYPES
export const CURRENT_UPDATE = 'CURRENT_UPDATE'
export const LOAD_TODOS = 'LOAD_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const TODO_REPLACE = 'TODO_REPLACE'
export const TODO_DELETE = 'TODO_DELETE'

// LOCAL AND EXPORTED DISPATCHERS
export const updateCurrent = (val) => ({
    type: CURRENT_UPDATE,
    payload: val
})

export const loadTodos = (todos) => ({
    type: LOAD_TODOS,
    payload: todos
})

export const addTodo = (name) => ({
    type: ADD_TODO,
    payload: name
})

export const replaceTodo = (todo) => ({
    type: TODO_REPLACE,
    payload: todo
})

export const removeTodo = (id) => ({
    type: TODO_DELETE,
    payload: id
})

// LOCAL AND EXPORTED ACTIONS
export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('loading todos!'))
        getTodos()
            .then(todos => dispatch(loadTodos(todos.data)))
    }
}

export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving Todo'))
        createTodo(name)
            .then(res => dispatch(addTodo(res.data)))
    }
}

export const toggleTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('Saving todo'))
        const {todos} = getState().todo
        const todo = todos.find(t => t.id === id)
        const toggled = {...todo, isComplete: !todo.isComplete}
        updateTodo(toggled)
            .then(res => dispatch(replaceTodo(res.data)))
    }
}

export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch(showMessage('removing todo'))
        destroyTodo(id)
            .then(res => dispatch(removeTodo(id)))
    }
}

export const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(t => !t.isComplete)
        case 'completed':
            return todos.filter(t => t.isComplete)
        default:
            return todos
    }
}

// TODO REDUCER
export default (state = initState, action) => {
    switch (action.type) {
        case CURRENT_UPDATE:
            return {...state, currentTodo: action.payload}
        case LOAD_TODOS:
            return {...state, todos: action.payload}
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case TODO_REPLACE:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {...todo, isComplete: action.payload.isComplete}
                    }
                    return todo
                })
            }
        case TODO_DELETE:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload)
            }
        default:
            return state
    }
}