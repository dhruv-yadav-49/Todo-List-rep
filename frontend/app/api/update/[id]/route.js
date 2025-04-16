import axios from 'axios';

export async function POST(req, { params }) {
  const { id } = params;
  const formData = await req.formData();
  const title = formData.get('title');
  const description = formData.get('description');

  try {
    await axios.put(`http://localhost:5000/todos/${id}`, {
      title,
      description,
    });

    return Response.redirect(`/?id=${id}`, 302);
  } catch (error) {
    console.error('Error updating todo:', error);
    return new Response('Failed to update', { status: 500 });
  }
}
