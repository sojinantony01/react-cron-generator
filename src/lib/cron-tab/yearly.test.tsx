import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearlyCron from './yearly';

describe('YearlyCron', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <YearlyCron onChange={vi.fn()} value={[]} translate={(k: string) => k} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('displays the "yearly" text', () => {
    render(<YearlyCron onChange={vi.fn()} value={[]} translate={(k: string) => k} />);
    expect(screen.getByText('yearly')).toBeInTheDocument();
  });
});
