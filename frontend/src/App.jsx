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
        filter,
        setFilter,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleToggleTask,
    } = useTasks();

    return (
        <div className='wrapper'>
            <LayoutHeader />
            <LayoutMain tasks={tasks}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        filter={filter}
                        setFilter={setFilter}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                        onToggleTask={handleToggleTask}
            />
            <LayoutFooter />
        </div>
    );
}

export default App;
