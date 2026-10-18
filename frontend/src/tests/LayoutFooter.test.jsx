import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LayoutFooter from '../class/layout/LayoutFooter.jsx';

describe('LayoutFooter component', () => {
    test('рендерит копирайт и ФИО автора', () => {
        render(<LayoutFooter />);

        expect(screen.getByText(/Бобылев Антон Александрович/i)).toBeInTheDocument();
        expect(screen.getByText(/MITU/i)).toBeInTheDocument();
    });
});
