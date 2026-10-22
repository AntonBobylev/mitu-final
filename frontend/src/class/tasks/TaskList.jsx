import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onDeleteTask, onUpdateTask, onToggleTask, isLoading, rawTasksCount })
{
    if (isLoading) {
        return <div className="status-message">Загрузка задач...</div>;
    }

    if (rawTasksCount === 0) {
        return <div className="status-message">Список задач пуст</div>;
    }

    if (tasks.length === 0) {
        return <div className="status-message">Нет задач для отображения в этом фильтре</div>;
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
