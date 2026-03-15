import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';

vi.mock('../src/services/mediaService', () => ({
  mediaService: {
    enumerateDevices: vi.fn(async () => []),
    openCamera: vi.fn(),
    openMicrophone: vi.fn(),
    openDisplay: vi.fn()
  }
}));

describe('App', () => {
  it('renders studio shell', () => {
    render(<App />);
    expect(screen.getByText(/Live Production Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Program Preview/i)).toBeInTheDocument();
  });
});
