// client/src/App.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos').then((response) => setTodos(response.data));
  }, []);

  return (
    <div>
      <h1>MERN Todo Dashboard</h1>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
