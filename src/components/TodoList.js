import React, { useState, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';
import { db } from '../firebase'
import { useNavigate } from 'react-router';
import { doc, setDoc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';


function TodoList() {
    const [todos, setTodos] = useState([]);
    const { logout } = UserAuth();
    const navigate = useNavigate();
    const { user } = UserAuth();

    useEffect(() => {

        const fetchTodos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "TODOS"));
                let list = [];
                querySnapshot.forEach((doc) => {

                    list.push({ ...doc.data().newtodo });
                });
                setTodos(list);

            } catch (error) {
                console.log(error)
            }

        }
        fetchTodos();

    }, [todos])
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updatedTodos);
    }

    const addTodo = async todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {   //to have multiple spaces
            return;
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        // console.log(todos);
        try {
            const newtodo = { ...todo, email: user.email };
            await setDoc(doc(db, "TODOS", todo.id), {
                newtodo
            });
            var vis = document.getElementsByClassName("added")[0];
            vis.style.visibility = "visible";

            setTimeout(() => {
                var vis = document.getElementsByClassName("added")[0];
                vis.style.visibility = "hidden";
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const removeTodo = async id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
        try {
            await deleteDoc(doc(db, "TODOS", id));
        } catch (error) {
            console.log(error);
        }

    }
    const updateTodo = async (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))

        const updateRef = doc(db, "TODOS", todoId);

        newValue.id = todoId;
        newValue.email = user.email;
        await updateDoc(updateRef, {
            newtodo: newValue
        });

    }
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div>

            <h1>What's the plan for today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />

            <div>
                <button className="buttonn" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}

export default TodoList
