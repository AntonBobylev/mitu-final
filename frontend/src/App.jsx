import { useEffect, useState } from 'react';

import './index.css';

import LayoutFooter from './class/layout/LayoutFooter.jsx';
import LayoutHeader from './class/layout/LayoutHeader.jsx';
import LayoutMain from './class/layout/LayoutMain.jsx';

function App()
{
    const [tasks, setTasks]           = useState([]),
          [inputValue, setInputValue] = useState('');

    const API_URL                 = import.meta.env.VITE_API_URL,
          API_KEY                 = import.meta.env.VITE_API_KEY,
          API_KEY_IN_HEADERS_NAME = 'x-api-key';

    useEffect(() => {
        fetch(API_URL, { headers: { [API_KEY_IN_HEADERS_NAME]: API_KEY } })
            .then(res => res.json())
            .then(setTasks)
            .catch(err => console.error('Error:', err));
    }, []);

    const handleAddTask = async () => {
        if (!inputValue.trim()) {
            return;
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({ text: inputValue })
            });

            const newTask = await res.json();
            setTasks([...tasks, newTask]);
            setInputValue('');
        } catch (err) {
            console.error('Error when adding:', err);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'x-api-key': API_KEY }
            });

            if (res.ok) {
                setTasks(tasks.filter((task) => task.id !== id));
            }
        } catch (err) {
            console.error('Error when deleting:', err);
        }
    }

    const handleUpdateTask = async (id, newText) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({ text: newText })
            });
            const updated = await response.json();

            setTasks(tasks.map((task) => task.id === id ? { ...task, text: updated.text } : task));
        } catch (err) {
            console.error('Error when updating:', err);
        }
    }

    return (
        <div className='wrapper'>
            <LayoutHeader />
            <LayoutMain />
            <LayoutFooter />
        </div>
    );
}

export default App;
