import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryMenu from '../src/components/CategoryMenu';

describe('CategoryMenu', () => {
  it('renders all category buttons', () => {
    const setCategory = jest.fn();
    render(<CategoryMenu setCategory={setCategory} />);
    
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons).toHaveLength(5); 
  });

  it('calls setCategory with the right category when clicked', () => {
    const setCategory = jest.fn();
    render(<CategoryMenu setCategory={setCategory} />);
    
    const breakfastButton = screen.getByText('Breakfast');
    fireEvent.click(breakfastButton);
    
    expect(setCategory).toHaveBeenCalledWith('Breakfast'); 
  });
});
