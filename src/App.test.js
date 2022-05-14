import { render, screen } from '@testing-library/react';

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
  });
});
