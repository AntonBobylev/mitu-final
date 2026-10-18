import TaskList from '../tasks/TaskList.jsx';
import TaskAdder from '../tasks/TaskAdder.jsx';

export default function LayoutMain({tasks, onDeleteTask, onUpdateTask, inputValue, setInputValue, onAddTask})
{
    return (
        <main className='layout-section'>
            <div className='main-wrapper'>
                <TaskAdder inputValue={inputValue}
                           setInputValue={setInputValue}
                           onAddTask={onAddTask}
                />
                <TaskList tasks={tasks}
                          onDeleteTask={onDeleteTask}
                          onUpdateTask={onUpdateTask}
                />
            </div>
        </main>
    );
}
