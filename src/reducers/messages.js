//IMPORT ACTION TYPES
import {ADD_TODO, LOAD_TODOS, TODO_REPLACE, TODO_DELETE} from './todo'

//LOCAL ACTION TYPES
const MESSAGE_SHOW = 'MESSAGE_SHOW'

// LOCAL DISPATCH
export const showMessage = (msg) => ({
    type: MESSAGE_SHOW,
    payload: msg
})

// REDUCER
export default function(state = '', action) {
    switch (action.type) {
        case MESSAGE_SHOW:
            return action.payload
        case ADD_TODO:
            return ''
        case LOAD_TODOS:
            return ''
        case TODO_REPLACE:
            return ''
        case TODO_DELETE:
            return ''
        default:
            return state
    }
}