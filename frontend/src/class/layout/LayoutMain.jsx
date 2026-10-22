import TaskList from '../tasks/TaskList.jsx';
import TaskAdder from '../tasks/TaskAdder.jsx';
import TaskFilters from '../tasks/TaskFilters.jsx';

export default function LayoutMain({
    tasks,
    rawTasksCount,
    onDeleteTask,
    onUpdateTask,
    onToggleTask,
    inputValue,
    setInputValue,
    onAddTask,
    filter,
    setFilter,
    isLoading,
    error,
    refetch
})
{
    return (
        <main>
            <div className='main-wrapper'>
                <TaskAdder inputValue={inputValue}
                           setInputValue={setInputValue}
                           onAddTask={onAddTask}
                />

                <TaskFilters filter={filter} setFilter={setFilter} />

                {error && (
                    <div className="error-banner">
                        <span>⚠️ {error}</span>
                        <button className="button retry-button" onClick={refetch}>Повторить</button>
                    </div>
                )}

                <TaskList tasks={tasks}
                          rawTasksCount={rawTasksCount}
                          onDeleteTask={onDeleteTask}
                          onUpdateTask={onUpdateTask}
                          onToggleTask={onToggleTask}
                          isLoading={isLoading}
                />
            </div>
        </main>
    );
}
