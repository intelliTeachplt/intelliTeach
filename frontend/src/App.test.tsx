import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders IntelliTeach platform title', () => {
  render(<App />);
  const titleElement = screen.getByText(/IntelliTeach/i);
  expect(titleElement).toBeInTheDocument();
});
