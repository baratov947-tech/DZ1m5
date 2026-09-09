import { useState } from 'react';
import { useTodoStore } from './store/useTodoStore';

function App() {
    const [text, setText] = useState('');
    const { todos, addTodo, deleteTodo, toggleTodo } = useTodoStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        addTodo(text.trim());
        setText('');
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>Список задач (Zustand)</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите задачу..."
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Добавить
                </button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.length === 0 && <p style={{ color: '#888' }}>Список задач пуст</p>}

                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            borderBottom: '1px solid #eee',
                        }}
                    >
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#888' : '#000',
                                }}
                            >
                {todo.title}
              </span>
                        </label>

                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer',
                            }}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;