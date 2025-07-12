import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';

// Simple test component
function TestComponent() {
  return <h1>Test Component</h1>;
}

test('renders test component', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  const titleElement = screen.getByRole('heading', { level: 1 });
  expect(titleElement).toHaveTextContent('Test Component');
});