import './index.css';

import useTasks from './class/hooks/useTasks.js';

import LayoutFooter from './class/layout/LayoutFooter.jsx';
import LayoutHeader from './class/layout/LayoutHeader.jsx';
import LayoutMain from './class/layout/LayoutMain.jsx';

function App()
{
    const {
        tasks,
        inputValue,
        setInputValue,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
    } = useTasks();

    return (
        <div className='wrapper'>
            <LayoutHeader />
            <LayoutMain tasks={tasks}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
            />
            <LayoutFooter />
        </div>
    );
}

export default App;
