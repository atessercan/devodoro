import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';

describe('Button component', () => {
  test('renders "Hello!" if the button was not clicked', () => {
    render(<Button />);
    const textElement = screen.getByText('Hello!');
    expect(textElement).toBeInTheDocument();
  });

  test('renders "Goodbye!" if the button was clicked', () => {
    // Arrange
    render(<Button />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('Goodbye!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "Hello!" if the button was clicked', () => {
    // Arrange
    render(<Button />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('Hello!', { exact: false });
    expect(outputElement).toBeNull();
  });
});
