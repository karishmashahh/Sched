import React, { useState, useEffect, useRef } from 'react'
import { v4 } from 'uuid';
import { MdOutlineDoneOutline } from "react-icons/md";

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()    //automatically the pointer is in the todo form
    })

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: v4(),
            text: input
        });
        setInput('');
    };
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder='Add a todo'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className='todo-button'>
                        Add todo
                    </button>
                </>
            )}
            <div className="added">

                <span style={{ marginRight: "10px" }}>
                    To Do added succesfully
                </span>
                <MdOutlineDoneOutline></MdOutlineDoneOutline>
            </div>
        </form>
    )
}

export default TodoForm
