import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { check } from 'prettier';

import App from './App';
import { ListProvider } from './context/ListContext';

describe('App', () => {
  it('tests basic app functionality', async () => {
    render(
      <ListProvider>
        <App />
      </ListProvider>
    );
    screen.getByText(/my shopping list/i);
    const newItemInput = screen.getByPlaceholderText(/enter item/i);
    expect(newItemInput).toBeInTheDocument();

    // A user adds eggs to her shopping list, test whether a checkbox for eggs appears as well as a delete button
    userEvent.type(newItemInput, 'eggs');
    userEvent.click(screen.getByText('Add item'));
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    const checkbox = screen.getByLabelText(/eggs/i);
    expect(checkbox.checked).toEqual(false);

    // The user clicks on eggs to mark it as complete, test whether the checkbox gets checked
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    // Verify total items count
    expect(screen.getByText(/total items: 1/i)).toBeInTheDocument();

    // user deletes her eggs item, verify the total updates
    userEvent.click(screen.getByText(/delete/i));
    expect(screen.getByText(/total items: 0/i)).toBeInTheDocument();
  });
});
