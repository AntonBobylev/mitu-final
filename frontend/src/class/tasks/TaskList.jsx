import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleTask })
{
    if (tasks.length === 0) {
        return <div className="no-tasks">Нет задач для отображения</div>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id}
                          task={task}
                          onDelete={onDeleteTask}
                          onUpdate={onUpdateTask}
                          onToggle={onToggleTask}
                />
            ))}
        </ul>
    );
}
