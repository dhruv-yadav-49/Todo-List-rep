// components/TodoList.js
import Link from 'next/link';
import { getTodos } from '@/lib/api';

export default async function TodoList({ page }) {
  const { todos, totalPages } = await getTodos(page);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {/* Pass both id and page in query params */}
            <Link href={`/?id=${todo._id}&page=${page}`}>
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/?page=${i + 1}`}
            className={`px-3 py-1 rounded ${
              i + 1 === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
