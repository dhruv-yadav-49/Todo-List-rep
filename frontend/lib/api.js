const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function getTodos(page = 1) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/todos?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return await res.json();
  } catch (err) {
    console.error("Error fetching todos:", err);
    return { todos: [], totalPages: 0 };
  }
}

export async function getTodo(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/todos/${id}`);
    if (!res.ok) throw new Error("Failed to fetch todo");
    return await res.json();
  } catch (err) {
    console.error("Error fetching todo:", err);
    return null;
  }
}
