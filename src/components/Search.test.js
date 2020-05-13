import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import Search from './Search';

describe("Hero's Search component", () => {
  const mockSearchHandler = jest.fn();
  const mockCitySelectionHandler = jest.fn();

  const searchProps = {
    placeholder: 'TEST_PLACEHOLDER',
    city: 'sydney',
    handleSearch: mockSearchHandler,
    handleCitySelection: mockCitySelectionHandler,
  };

  test('Search handler is called with the right value', () => {
    const testInputValue = 'TEST';

    const { getByLabelText } = render(<Search {...searchProps} />);

    const submitButton = getByLabelText(/search keyword/i);
    const input = getByLabelText(/keyword input/i);

    fireEvent.change(input, { target: { value: testInputValue } });
    fireEvent.click(submitButton);

    expect(mockSearchHandler).toHaveBeenCalledTimes(1);
  });

  test('input value updates on change', () => {
    const { getByLabelText } = render(<Search {...searchProps} />);

    const testInputValue = 'TEST';

    const input = getByLabelText(/keyword input/i);
    fireEvent.change(input, { target: { value: testInputValue } });

    expect(input.value).toBe(testInputValue);
  });

  test('the form is accessible', async () => {
    const { container } = render(<Search {...searchProps} />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
