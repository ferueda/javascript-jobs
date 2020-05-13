import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Search from '../components/Search';

describe('<Search />', () => {
  const mockSearchHandler = jest.fn((event) => {
    const formElement = event.target;
    return formElement.querySelector('input').value;
  });
  const mockCitySelectionHandler = jest.fn((event) => {
    return event.target.value;
  });

  const searchProps = {
    placeholder: 'TEST_PLACEHOLDER',
    city: 'sydney',
    handleSearch: mockSearchHandler,
    handleCitySelection: mockCitySelectionHandler,
  };

  describe('form element', () => {
    test('form, input and button elements are rendered', () => {
      const { getByLabelText, getByTestId } = render(<Search {...searchProps} />);

      const form = getByTestId(/keyword-form/i);
      const input = getByLabelText(/keyword input/i);
      const button = getByLabelText(/search keyword/i);

      expect(form).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test('input value updates on change', () => {
      const { getByLabelText } = render(<Search {...searchProps} />);

      const testInputValue = 'TEST';

      const input = getByLabelText(/keyword input/i);
      user.type(input, testInputValue);

      expect(input.value).toBe(testInputValue);
    });

    test('search handler is called and returns the right value after submitting form', () => {
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

    test('the form is accessible', async () => {
      const { container } = render(<Search {...searchProps} />);
      const result = await axe(container);
      expect(result).toHaveNoViolations();
    });
  });

  describe('dropdown element (city selection)', () => {
    test('dropdown elements are rendered', () => {
      const { getByLabelText, queryAllByRole } = render(<Search {...searchProps} />);
      const select = getByLabelText(/select city/i);
      const options = queryAllByRole('option');

      expect(select).toBeInTheDocument();
      expect(options.length).toBeGreaterThan(0);
      expect(options).toMatchInlineSnapshot(`
        Array [
          <option
            value="sydney"
          >
            Sydney
          </option>,
          <option
            value="melbourne"
          >
            Melbourne
          </option>,
        ]
      `);
    });

    test('on change, handler func is called and returs the right value', () => {
      const { getByLabelText, queryAllByRole } = render(<Search {...searchProps} />);

      const select = getByLabelText(/select city/i);
      const options = queryAllByRole('option');

      fireEvent.change(select, { target: { value: options[0].value } });

      expect(mockCitySelectionHandler).toHaveBeenCalledTimes(1);
      expect(mockCitySelectionHandler).toHaveReturnedTimes(1);
      expect(mockCitySelectionHandler).toHaveReturnedWith(options[0].value);

      fireEvent.change(select, { target: { value: options[1].value } });

      expect(mockCitySelectionHandler).toHaveBeenCalledTimes(2);
      expect(mockCitySelectionHandler).toHaveReturnedTimes(2);
      expect(mockCitySelectionHandler).toHaveReturnedWith(options[1].value);
    });
  });
});
