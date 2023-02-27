import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import App from '../App';

const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )

describe('App test', () => {
    it('should load', () => {
        render(<App />);
        const text = screen.getByText("Nothing scheduled.");
        expect(text).toBeInTheDocument()
    });

    it('should call onClick prop when clicked', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Add New Entry</Button>)
        fireEvent.click(screen.getByText("Add New Entry"))
        expect(handleClick).toHaveBeenCalledTimes(1)
      })
});