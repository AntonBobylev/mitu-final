import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LayoutHeader from '../class/layout/LayoutHeader.jsx';

describe('LayoutHeader component', () => {
    test('рендерит название приложения в шапке', () => {
        render(<LayoutHeader />);

        expect(screen.getByText('TodoList WEB-application')).toBeInTheDocument();
    });
});
