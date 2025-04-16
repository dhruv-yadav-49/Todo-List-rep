'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodoDetail({ id }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
        setTodo(res.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
        title: todo.title,
        description: todo.description,
      });
      alert('Todo updated successfully!');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Edit Todo</h2>
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Title"
      />
      <textarea
        name="description"
        value={todo.description}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Description"
      ></textarea>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
}
