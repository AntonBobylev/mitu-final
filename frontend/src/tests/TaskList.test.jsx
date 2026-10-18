import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../class/tasks/TaskList.jsx';

describe('TaskList component', () => {
    test('рендерит список задач', () => {
        const tasks = [
            { id: 1, text: 'first' },
            { id: 2, text: 'second' }
        ];

        render(
            <TaskList
                tasks={tasks}
                onDeleteTask={() => {}}
                onUpdateTask={() => {}}
            />
        );

        expect(screen.getByText('first')).toBeInTheDocument();
        expect(screen.getByText('second')).toBeInTheDocument();
    });
});
