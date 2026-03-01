import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';

test('renders brand link in navigation', () => {
  render(
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  );

  expect(screen.getByRole('link', { name: "Kramille's Closet" })).toBeInTheDocument();
});
