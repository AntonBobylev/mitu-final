import TaskList from '../tasks/TaskList.jsx';
import TaskAdder from '../tasks/TaskAdder.jsx';
import TaskFilters from '../tasks/TaskFilters.jsx';

export default function LayoutMain({
    tasks,
    onDeleteTask,
    onUpdateTask,
    onToggleTask,
    inputValue,
    setInputValue,
    onAddTask,
    filter,
    setFilter
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
                <TaskList tasks={tasks}
                          onDeleteTask={onDeleteTask}
                          onUpdateTask={onUpdateTask}
                          onToggleTask={onToggleTask}
                />
            </div>
        </main>
    );
}
