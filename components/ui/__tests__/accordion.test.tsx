import React from 'react';
import { render, screen } from '@testing-library/react';
import Accordion from '../Accordion';

test('renders Accordion component', () => {
    render(<Accordion title="Test Accordion" content="This is a test content." />);
    const titleElement = screen.getByText(/Test Accordion/i);
    expect(titleElement).toBeInTheDocument();
    
    const contentElement = screen.getByText(/This is a test content./i);
    expect(contentElement).toBeInTheDocument();
});