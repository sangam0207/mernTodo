// client/src/components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

function TodoForm({ setTodos }) {
  const [todo, setTodo] = useState({ title: '', link: '' });

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', todo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTodo({ title: '', link: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Link"
        value={todo.link}
        onChange={(e) => setTodo({ ...todo, link: e.target.value })}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;
