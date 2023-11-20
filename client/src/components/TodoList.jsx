// client/src/components/TodoList.js
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

function TodoList({ todos, setTodos }) {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(destinationIndex, 0, removed);

    setTodos(updatedTodos);

    // Update backend with new positions
    await axios.patch(`http://localhost:5000/api/todos/${removed._id}`, {
      position: destinationIndex,
    });
  };

  const toggleCompleted = async (id, completed) => {
    try {
      console.log('Updating todo:', id, completed);
  
      const response = await axios.patch(`http://localhost:5000/api/todos/${id}`, { completed });
      
      console.log('Response:', response.data);
  
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === response.data._id ? response.data : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable
                key={todo._id}
                draggableId={todo._id}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        toggleCompleted(todo._id, !todo.completed)
                      }
                    />
                    <span style={{ textDecoration: todo.completed && 'line-through' }}>
                      {todo.title}
                    </span>
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
