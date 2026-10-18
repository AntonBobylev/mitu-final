import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App.jsx';

describe('App component', () => {
    const TEST_PREFIX = '[TEST]';

    afterEach(async () => {
        const API_URL = import.meta.env.VITE_API_URL,
              API_KEY = import.meta.env.VITE_API_KEY;

        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
            const res = await fetch(API_URL, {
                headers: { 'x-api-key': API_KEY },
            });

            if (!res.ok) {
                return;
            }

            const tasks = await res.json(),
                testTasks = tasks.filter((task) => task.text && (
                    task.text.includes('Проверить тест')
                    || task.text.includes('Очистка инпута')
                    || task.text.includes('Удалить задачу')
                ));

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

        const uniqueId   = Date.now(),
              uniqueText = `Проверить тест ${uniqueId}`,
              input      = screen.getByPlaceholderText(/введите задачу/i),
              button     = screen.getByText(/добавить/i);

        await user.type(input, `${TEST_PREFIX} ${uniqueText}`);
        await user.click(button);

        expect(await screen.findByText(new RegExp(uniqueId))).toBeInTheDocument();
    });

    test('не добавляет пустую задачу или задачу из одних пробелов', async () => {
        const user = userEvent.setup();
        render(<App />);

        const input = screen.getByPlaceholderText(/введите задачу/i),
              button = screen.getByText(/добавить/i);

        await user.type(input, '   ');
        await user.click(button);

        expect(input.value.trim()).toBe('');
    });

    test('очищает поле ввода после успешного добавления задачи', async () => {
        const user = userEvent.setup();
        render(<App />);

        const uniqueId   = Date.now(),
              uniqueText = `Очистка инпута ${uniqueId}`,
              input      = screen.getByPlaceholderText(/введите задачу/i),
              button     = screen.getByText(/добавить/i);

        await user.type(input, `${TEST_PREFIX} ${uniqueText}`);
        await user.click(button);

        await screen.findByText(new RegExp(uniqueId));

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });

    test('удаляет задачу при клике на иконку удаления', async () => {
        const user = userEvent.setup();
        render(<App />);

        const uniqueId         = Date.now(),
              uniqueDeleteText = `Удалить задачу ${uniqueId}`,
              input            = screen.getByPlaceholderText(/введите задачу/i),
              button           = screen.getByText(/добавить/i);

        await user.type(input, `${TEST_PREFIX} ${uniqueDeleteText}`);
        await user.click(button);

        const taskElement = await screen.findByText(new RegExp(uniqueId));
        expect(taskElement).toBeInTheDocument();

        const taskRow = taskElement.closest('li') || taskElement.parentElement,
              deleteButton = taskRow.querySelector('button:last-child') || screen.getAllByText('🗑️')[0];

        await user.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText(new RegExp(uniqueId))).not.toBeInTheDocument();
        });
    });
});
