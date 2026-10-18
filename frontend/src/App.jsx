import { useEffect, useState } from 'react';

function App()
{
    const [tasks, setTasks]           = useState([]),
          [inputValue, setInputValue] = useState('');

    const API_URL                 = process.env.API_URL,
          API_KEY                 = process.env.API_KEY,
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

    return (
        <>
            // TODO: implement
        </>
    );
}

export default App;
