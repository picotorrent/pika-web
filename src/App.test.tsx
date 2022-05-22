import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search field', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/search torrents/i);
  expect(linkElement).toBeInTheDocument();
});
