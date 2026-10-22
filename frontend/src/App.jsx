import './index.css';

import useTasks from './class/hooks/useTasks.js';

import LayoutFooter from './class/layout/LayoutFooter.jsx';
import LayoutHeader from './class/layout/LayoutHeader.jsx';
import LayoutMain from './class/layout/LayoutMain.jsx';

function App()
{
    const {
        tasks,
        rawTasksCount,
        inputValue,
        setInputValue,
        filter,
        setFilter,
        isLoading,
        error,
        refetch,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleToggleTask,
    } = useTasks();

    return (
        <div className='wrapper'>
            <LayoutHeader />
            <LayoutMain tasks={tasks}
                        rawTasksCount={rawTasksCount}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        filter={filter}
                        setFilter={setFilter}
                        isLoading={isLoading}
                        error={error}
                        refetch={refetch}
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
