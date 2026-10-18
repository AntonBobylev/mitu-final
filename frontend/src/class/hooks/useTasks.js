import { useState, useEffect } from 'react';

export default function useTasks()
{
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const API_URL = import.meta.env.VITE_API_URL,
          API_KEY = import.meta.env.VITE_API_KEY,
          API_KEY_IN_HEADERS_NAME = 'x-api-key';

    const headers = {
        [API_KEY_IN_HEADERS_NAME]: API_KEY,
    };

    useEffect(() => {
        fetch(API_URL, { headers })
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => console.error('Error:', err));
    }, [API_URL]);

    const handleAddTask = async () => {
        if (!inputValue.trim()) return;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputValue }),
            });

            const newTask = await res.json();
            setTasks((prev) => [...prev, newTask]);
            setInputValue('');
        } catch (err) {
            console.error('Error when adding:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers,
            });

            if (res.ok) {
                setTasks((prev) => prev.filter((task) => task.id !== id));
            }
        } catch (err) {
            console.error('Error when deleting:', err);
        }
    };

    const handleUpdateTask = async (id, newText) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            });
            const updated = await response.json();

            setTasks((prev) =>
                prev.map((task) => (task.id === id ? { ...task, text: updated.text } : task))
            );
        } catch (err) {
            console.error('Error when updating:', err);
        }
    };

    return {
        tasks,
        inputValue,
        setInputValue,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
    };
}
