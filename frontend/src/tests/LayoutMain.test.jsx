import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LayoutMain from '../class/layout/LayoutMain.jsx';

describe('LayoutMain component', () => {
    test('рендерит элементы ввода и список задач', () => {
        const tasks = [{ id: 1, text: 'Тестовая задача в макете' }];

        render(
            <LayoutMain
                tasks={tasks}
                inputValue=""
                setInputValue={() => {}}
                onAddTask={() => {}}
                onDeleteTask={() => {}}
                onUpdateTask={() => {}}
            />
        );

        expect(screen.getByPlaceholderText(/введите задачу/i)).toBeInTheDocument();
        expect(screen.getByText('Тестовая задача в макете')).toBeInTheDocument();
    });
});
