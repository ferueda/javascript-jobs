import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Search from '../components/Search';

describe('<Search />', () => {
  const mockSearchHandler = jest.fn((event) => event.target.querySelector('input').value);
  const mockCitySelectionHandler = jest.fn((event) => event.target.value);

  const searchProps = {
    placeholder: 'TEST_PLACEHOLDER',
    city: 'sydney',
    handleSearch: mockSearchHandler,
    handleCitySelection: mockCitySelectionHandler,
  };

  describe('form element', () => {
    const renderForm = () => {
      const utils = render(<Search {...searchProps} />);

      const testInputValue = 'TEST';
      const form = utils.getByTestId(/keyword-form/i);
      const input = utils.getByLabelText(/keyword input/i);
      const button = utils.getByLabelText(/search keyword/i);

      return {
        ...utils,
        form,
        input,
        button,
        testInputValue,
      };
    };

    test('form, input and button elements are rendered', () => {
      const { form, input, button } = renderForm();

      expect(form).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(input.placeholder).toBe(searchProps.placeholder);
    });

    test('input value updates on change', () => {
      const { input, testInputValue } = renderForm();

      user.type(input, testInputValue);

      expect(input.value).toBe(testInputValue);
    });

    test('search handler is called and returns the right value after submitting form', () => {
      const { form, input, testInputValue } = renderForm();

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
    const renderSelect = () => {
      const utils = render(<Search {...searchProps} />);

      const select = utils.getByLabelText(/select city/i);
      const options = utils.queryAllByRole('option');

      return {
        ...utils,
        select,
        options,
      };
    };

    test('dropdown elements are rendered', () => {
      const { select, options } = renderSelect();

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
      const { select, options } = renderSelect();

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
