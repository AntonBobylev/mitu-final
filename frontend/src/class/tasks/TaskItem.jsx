import { useState } from 'react';

export default function TaskItem({ task, onDelete, onUpdate })
{
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        if (editText.trim() === '') {
            handleCancel();

            return;
        }

        onUpdate(task.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <li>
            {isEditing ? (
                <div className="task-item-wrapper">
                    <input
                        type="text"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        onKeyDown={handleKeyPress}
                        className="edit-input"
                        autoFocus
                    />

                    <div className="task-item-actions">
                        <button className="button" onClick={handleSave}>💾</button>
                        <button className="button" onClick={handleCancel}>❌</button>
                    </div>
                </div>
            ) : (
                <div className="task-item-wrapper">
                    <div className="task-item-text">{task.text}</div>
                    <div className="task-item-actions">
                        <button className="button" onClick={() => handleEdit()}>✏️</button>
                        <button className="button" onClick={() => onDelete(task.id)}>🗑️</button>
                    </div>
                </div>
            )}
        </li>
    );
}
