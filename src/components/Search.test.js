import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Search from './Search';

describe('<Search />', () => {
  const mockSearchHandler = jest.fn((event) => {
    const formElement = event.target;
    return formElement.querySelector('input').value;
  });
  const mockCitySelectionHandler = jest.fn();

  const searchProps = {
    placeholder: 'TEST_PLACEHOLDER',
    city: 'TEST_CITY',
    handleSearch: mockSearchHandler,
    handleCitySelection: mockCitySelectionHandler,
  };

  test('search handler is called when submitting form', () => {
    const testInputValue = 'TEST';

    const { getByLabelText, getByTestId } = render(<Search {...searchProps} />);

    const form = getByTestId(/keyword-form/i);
    const input = getByLabelText(/keyword input/i);

    fireEvent.change(input, { target: { value: testInputValue } });
    fireEvent.submit(form);

    expect(mockSearchHandler).toHaveBeenCalledTimes(1);
    expect(mockSearchHandler).toReturn();
    expect(mockSearchHandler).toHaveReturnedWith(testInputValue);
  });

  test('search handler returns the right value when form is submitted', () => {
    const testInputValue = 'TEST';

    const { getByLabelText, getByTestId } = render(<Search {...searchProps} />);

    const form = getByTestId(/keyword-form/i);
    const input = getByLabelText(/keyword input/i);

    fireEvent.change(input, { target: { value: testInputValue } });
    fireEvent.submit(form);

    expect(mockSearchHandler).toHaveReturnedWith(testInputValue);
  });

  test('input value updates on change', () => {
    const { getByLabelText } = render(<Search {...searchProps} />);

    const testInputValue = 'TEST';

    const input = getByLabelText(/keyword input/i);
    user.type(input, testInputValue);

    expect(input.value).toBe(testInputValue);
  });

  test('the form is accessible', async () => {
    const { container } = render(<Search {...searchProps} />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
