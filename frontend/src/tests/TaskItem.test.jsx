import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import TaskItem from '../class/tasks/TaskItem.jsx';

describe('TaskItem component', () => {
    test('рендерит текст задачи', () => {
        const task = { id: 1, text: 'Выучить Vitest' };

        render(
            <TaskItem task={task} onDelete={() => {}} onUpdate={() => {}} />
        );
        expect(screen.getByText('Выучить Vitest')).toBeInTheDocument();
    });

    test('вызывается onDelete при клике на кнопку удаления', () => {
        const task = { id: 1, text: 'Выучить Vitest' };
        const onDelete = vi.fn();

        render(
            <TaskItem task={task} onDelete={onDelete} onUpdate={() => {}} />
        );

        fireEvent.click(screen.getByText('🗑️'));
        expect(onDelete).toHaveBeenCalledWith(task.id);
    });
});
