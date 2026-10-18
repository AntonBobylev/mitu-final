import TaskItem from './TaskItem.jsx';

export default function TaskList({tasks, onDeleteTask, onUpdateTask})
{
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id}
                          task={task}
                          onDelete={onDeleteTask}
                          onUpdate={onUpdateTask}
                />
            ))}
        </ul>
    );
}
