'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { SortableItem } from '../components/SortableItem';
import { Todo } from '@/Types';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: `todo-${uuidv4()}`,
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target?.id.slice(4);
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.id === over?.id
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // it took me a while to figure out why the pointer sensor wasn't working
  // it turns out that the activation constraints param is required
  // to make it work with the delete button on the SortableItem component
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="max-w-2xl w-full mx-auto border rounded-lg p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          id="todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          className="flex-grow p-2 border border-gray-300 rounded-l text-sky-500"
          placeholder="Add a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r w-16"
        >
          Add
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos}
          strategy={verticalListSortingStrategy}
        >
          {todos.map(({ id, text, completed }) => (
            <SortableItem
              key={id}
              id={id}
              onDelete={handleDeleteTodo}
            >
              <input
                id={`chk-${id}`}
                type="checkbox"
                defaultChecked={completed}
                onChange={handleCheckbox}
                className="mr-2"
              />
              <span className={`${completed ? "line-through text-sky-200": "text-green-400"}`}>{text}</span>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
