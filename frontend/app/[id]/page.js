// app/[id]/page.js

import TodoDetail from '@/components/TodoDetails';

export default function TodoDetailPage({ params }) {
  return (
    <div className="w-1/2">
      <TodoDetail id={params.id} />
    </div>
  );
}
