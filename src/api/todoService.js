import axios from 'axios'

const serverUrl = process.env.REACT_APP_BASE_URL

const request = axios.create({
    baseURL: serverUrl
})

export const getTodos = () => {
    return request.get(`/todos`)
}

export const createTodo = (name) => {
    return request.post(`/todos`, {name: name, isComplete: false})
}

export const updateTodo = (todo) => {
    return request.patch(`/todos/${todo.id}`, todo)
}

export const destroyTodo = (id) => {
    return request.delete(`/todos/${id}`)
}