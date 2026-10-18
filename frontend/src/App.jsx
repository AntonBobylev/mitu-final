import { useEffect, useState } from 'react';

function App()
{
    const [tasks, setTasks] = useState([]);

    const API_URL = process.env.API_URL,
          API_KEY = process.env.API_KEY,
          API_KEY_IN_HEADERS_NAME = 'x-api-key';

    useEffect(() => {
        fetch(API_URL, { headers: { [API_KEY_IN_HEADERS_NAME]: API_KEY } })
            .then(res => res.json())
            .then(setTasks)
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <>
            // TODO: implement
        </>
    );
}

export default App;
