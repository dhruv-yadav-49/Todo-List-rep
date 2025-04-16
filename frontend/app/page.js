// app/page.js

import CreateTodo from '@/components/CreateTodo';
import TodoList from '@/components/TodoList';
import { getTodos,getTodo } from '@/lib/api';

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  // fetch todos
  const { todos, totalPages } = await getTodos(page);

  // fetch selected todo if id is present
  const selectedId = searchParams.id;
  const selectedTodo = selectedId ? await getTodo(selectedId) : null;

  return (
    <main className="grid grid-cols-2 gap-8 p-8 max-w-6xl mx-auto">
      {/* Left: Create + Todo List */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Create New Todo</h1>
        <CreateTodo />

        <h2 className="text-2xl font-semibold mt-8 mb-4">Todo List</h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo._id} className="border p-3 rounded">
              <a href={`/?id=${todo._id}&page=${page}`} className="font-semibold text-blue-600">
                {todo.title}
              </a>
              <p className="text-gray-600">{todo.description}</p>
            </li>
          ))}
        </ul>

        {/* Optional: Pagination buttons */}
        <div className="mt-4 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <a
              key={i}
              href={`/?page=${i + 1}`}
              className={`px-3 py-1 rounded ${i + 1 === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      </div>

      {/* Right: Detail View */}
      <div>
        {selectedTodo ? (
          <form action={`/api/update/${selectedTodo._id}`} method="POST" className="space-y-4">
            <div>
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedTodo.title}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={selectedTodo.description}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="text-gray-500">Select a todo to view/edit</div>
        )}
      </div>
    </main>
  );
}
