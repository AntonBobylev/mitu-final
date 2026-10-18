import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useTasks from '../class/hooks/useTasks.js';

describe('useTasks hook', () => {
    beforeEach(() => {
        vi.restoreAllMocks();

        global.fetch = vi.fn(async (url, options) => {
            const method = options?.method || 'GET';

            if (method === 'GET') {
                return {
                    ok: true,
                    json: async () => [{ id: 1, text: 'Существующая задача' }],
                };
            }
            if (method === 'POST') {
                const body = JSON.parse(options.body);
                return {
                    ok: true,
                    json: async () => ({ id: 2, text: body.text }),
                };
            }
            if (method === 'DELETE') {
                return { ok: true, json: async () => ({}) };
            }
            if (method === 'PUT') {
                const body = JSON.parse(options.body);
                return {
                    ok: true,
                    json: async () => ({ id: 1, text: body.text }),
                };
            }
            return { ok: true, json: async () => ({}) };
        });
    });

    test('загружает задачи при монтировании', async () => {
        const { result } = renderHook(() => useTasks());

        await waitFor(() => {
            expect(result.current?.tasks).toHaveLength(1);
        });

        expect(result.current.tasks[0].text).toBe('Существующая задача');
        expect(result.current.inputValue).toBe('');
    });

    test('изменяет значение inputValue', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.setInputValue('Новая задача');
        });

        expect(result.current.inputValue).toBe('Новая задача');
    });

    test('добавляет новую задачу и очищает inputValue', async () => {
        const { result } = renderHook(() => useTasks());

        await waitFor(() => {
            expect(result.current?.tasks).toBeDefined();
        });

        act(() => {
            result.current.setInputValue('Тестовая задача');
        });

        await act(async () => {
            await result.current.handleAddTask();
        });

        expect(result.current.tasks).toHaveLength(2);
        expect(result.current.tasks[1].text).toBe('Тестовая задача');
        expect(result.current.inputValue).toBe('');
    });

    test('удаляет задачу по id', async () => {
        const { result } = renderHook(() => useTasks());

        await waitFor(() => {
            expect(result.current?.tasks).toHaveLength(1);
        });

        await act(async () => {
            await result.current.handleDeleteTask(1);
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    test('обновляет текст задачи', async () => {
        const { result } = renderHook(() => useTasks());

        await waitFor(() => {
            expect(result.current?.tasks).toHaveLength(1);
        });

        await act(async () => {
            await result.current.handleUpdateTask(1, 'Измененный текст');
        });

        expect(result.current.tasks[0].text).toBe('Измененный текст');
    });
});
