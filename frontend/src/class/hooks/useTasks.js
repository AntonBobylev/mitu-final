import { useState, useEffect } from 'react';

export default function useTasks()
{
    const [rawTasks, setRawTasks] = useState([]),
          [inputValue, setInputValue] = useState(''),
          [filter, setFilter] = useState('all'), // 'all', 'active', 'completed'
          [isLoading, setIsLoading] = useState(true),
          [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL,
          API_KEY = import.meta.env.VITE_API_KEY,
          API_KEY_IN_HEADERS_NAME = 'x-api-key';

    const headers = {
        [API_KEY_IN_HEADERS_NAME]: API_KEY,
    };

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(API_URL, { headers });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                setRawTasks(data);
            } else {
                throw new Error('Not valid format of data from server received');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Failed to load task list');
            setRawTasks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [API_URL]);

    const handleAddTask = async () => {
        if (!inputValue.trim()) {
            return;
        }

        setError(null);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputValue }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));

                throw new Error(errData.error || 'Failed to add task');
            }

            const newTask = await res.json();
            setRawTasks((prev) => [...prev, newTask]);
            setInputValue('');
        } catch (err) {
            console.error('Error when adding:', err);
            setError(err.message);
        }
    };

    const handleDeleteTask = async (id) => {
        setError(null);

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers,
            });

            if (!res.ok) {
                throw new Error('Failed to delete task');
            }

            setRawTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            console.error('Error when deleting:', err);
            setError(err.message);
        }
    };

    const handleUpdateTask = async (id, newText) => {
        setError(null);

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to update task');
            }

            const updated = await response.json();

            setRawTasks((prev) =>
                prev.map((task) => (task.id === id ? { ...task, text: updated.text } : task))
            );
        } catch (err) {
            console.error('Error when updating:', err);
            setError(err.message);
        }
    };

    const handleToggleTask = async (id) => {
        const taskToToggle = rawTasks.find(t => t.id === id);
        if (!taskToToggle) return;
        setError(null);

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !taskToToggle.completed }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to update task status');
            }

            const updated = await response.json();

            setRawTasks((prev) =>
                prev.map((task) => (task.id === id ? { ...task, completed: updated.completed } : task))
            );
        } catch (err) {
            console.error('Error when toggling status:', err);
            setError(err.message);
        }
    };

    const tasks = rawTasks.filter((task) => {
        if (filter === 'active') {
            return !task.completed;
        }

        if (filter === 'completed') {
            return task.completed;
        }

        return true;
    });

    return {
        tasks,
        rawTasksCount: rawTasks.length,
        inputValue,
        setInputValue,
        filter,
        setFilter,
        isLoading,
        error,
        refetch: fetchTasks,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleToggleTask,
    };
}
