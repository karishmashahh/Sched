import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { CgTrash } from "react-icons/cg";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UserAuth } from '../context/AuthContext'


function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const { user } = UserAuth();
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.filter(todo => todo.email === user.email).map((todo, index) => (

        <div className='todo-row' key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                <MdOutlineModeEditOutline
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='edit-icon'
                />

                <CgTrash
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon'
                />
            </div>
        </div>
    ))
}

export default Todo;
