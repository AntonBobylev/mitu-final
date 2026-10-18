import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App.jsx';

describe('App component', () => {
    const TEST_PREFIX = '[TEST]';

    afterEach(async () => {
        const API_URL = import.meta.env.VITE_API_URL,
              API_KEY = import.meta.env.VITE_API_KEY;

        if (!API_URL) return;

        try {
            const res = await fetch(API_URL, {
                headers: { 'x-api-key': API_KEY },
            });

            if (!res.ok) {
                return;
            }

            const tasks = await res.json();

            const testTasks = tasks.filter(
                (task) => task.text && task.text.includes(TEST_PREFIX)
            );

            await Promise.all(
                testTasks.map((task) =>
                    fetch(`${API_URL}/${task.id}`, {
                        method: 'DELETE',
                        headers: { 'x-api-key': API_KEY },
                    })
                )
            );
        } catch (e) {
            console.error('Ошибка при очистке тестовых данных:', e);
        }
    });

    test('добавляет новую задачу и отображает ее в списке', async () => {
        const user = userEvent.setup();

        render(<App />);

        const uniqueText = `Проверить тест ${Date.now()}`,
              input = screen.getByPlaceholderText(/введите задачу/i),
              button = screen.getByText(/добавить/i);

        await user.type(input, uniqueText);
        await user.click(button);

        expect(await screen.findByText(uniqueText)).toBeInTheDocument();
    });

    test('удаляет задачу при клике на иконку удаления', async () => {
        const user = userEvent.setup();
        render(<App />);

        const uniqueDeleteText = `Удалить задачу ${Date.now()}`,
              input = screen.getByPlaceholderText(/введите задачу/i),
              button = screen.getByText(/добавить/i);

        await user.type(input, uniqueDeleteText);
        await user.click(button);

        const taskElement = await screen.findByText(uniqueDeleteText);
        expect(taskElement).toBeInTheDocument();

        const taskRow = taskElement.closest('li') || taskElement.parentElement,
              deleteButton = taskRow.querySelector('button:last-child') || screen.getAllByText('🗑️')[0];

        await user.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText(uniqueDeleteText)).not.toBeInTheDocument();
        });
    });
});
