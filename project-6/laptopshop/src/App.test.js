import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./Allrouter', () => () => <div>BlueStore Laptop</div>);

test('renders app shell', () => {
  render(<App />);
  expect(screen.getByText(/BlueStore Laptop/i)).toBeInTheDocument();
});
