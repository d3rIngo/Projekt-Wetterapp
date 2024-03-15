import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page'; // Dateipfad zur Home-Komponente

test('renders button with correct text', () => {
  render(<Home />);
  const buttonElement = screen.getByText(/Wetter abrufen/i);
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement); // Button klicken
});
