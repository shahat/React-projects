import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
    // Test to check if the greeting message is rendered
    test('renders greeting message', () => {
        render(<Greeting />);
        const messageElement = screen.getByText(/Hello, World!/i);
        expect(messageElement).toBeInTheDocument();
    });

    // Test if it renders "It's good to see you" message
    test('renders its good to see you message', () => {
        render(<Greeting />);
        const messageElement = screen.getByText(/its good to see you/i);
        expect(messageElement).toBeInTheDocument();
    });

    // Test if the button is clicked
    test('button is clicked', () => {
        render(<Greeting />);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        const messageElement = screen.getByText(/changed/i);
        expect(messageElement).toBeInTheDocument();
    });

    // Test if the button is not clicked
    test('button is not clicked', () => {
        render(<Greeting />);
        const messageElement = screen.queryByText(/its good to see you/i);  // Use queryByText instead of queryAllByText
        expect(messageElement).toBeNull();  // This now correctly checks for absence
    });
});
