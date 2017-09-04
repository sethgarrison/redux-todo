import React from 'react'
import {connect} from 'react-redux'
import {fetchTodos, toggleTodo, deleteTodo, getVisibleTodos} from '../reducers/todo'

const TodoItem = ({id, name, isComplete, toggleTodo, deleteTodo}) => (
    <li>
        <span className="delete-item">
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </span>
        <input
            type="checkbox"
            onChange={()=> toggleTodo(id)}
            defaultChecked={isComplete} />
        {name}
    </li>
)

class TodoList extends React.Component {
    componentDidMount() {
        this.props.fetchTodos()
    }

    render() {
        return (
            <div className="Todo-List">
                <ul>
                    {this.props.todos.map(todo =>
                        <TodoItem
                            deleteTodo={this.props.deleteTodo}
                            toggleTodo={this.props.toggleTodo}
                            key={todo.id} {...todo} />)}
                </ul>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({todos: getVisibleTodos(state.todo.todos, ownProps.filter)}),
    {fetchTodos, toggleTodo, deleteTodo}
)(TodoList)