export async function createNote(subject, topic, level) {
  const response = await fetch('/api/new-note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, topic, level }),
  });
  if (!response.ok) throw new Error('Ошибка при создании заметки');
  return await response.json();
}

export async function getNote(id) {
  const response = await fetch(`/api/notes/${id}`);
  if (!response.ok) throw new Error('Заметка не найдена');
  return await response.json();
}