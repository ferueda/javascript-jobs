import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LinkButton, RegularButton } from '../components/Button';

describe('<Button />', () => {
  describe('<LinkButton />', () => {
    const props = {
      href: 'www.test.com',
      children: 'TEST BUTTON',
    };

    const renderLinkButton = () => {
      const utils = render(<LinkButton {...props} />);
      const button = utils.getByText(props.children);

      return {
        ...utils,
        button,
      };
    };

    test('it renders with the right props', () => {
      const { button } = renderLinkButton();

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(props.children);
      expect(button).toHaveAttribute('href', props.href);
    });

    test('it renders with the right styles', () => {
      const { button } = renderLinkButton();

      expect(button).toHaveStyle('background-color: #e74c3c');
      expect(button).toHaveStyle('color: #fff');
    });

    test('transparent <LinkButton /> renders with the right styles', () => {
      const { getByText } = render(<LinkButton {...props} color="transparent" />);
      const button = getByText(props.children);

      expect(button).toHaveStyle('background-color: transparent');
      expect(button).toHaveStyle('color: #e74c3c');
    });
  });

  describe('<RegularButton />', () => {
    const mockedOnClick = jest.fn();

    const props = {
      href: 'www.test.com',
      children: 'TEST BUTTON',
      onClick: mockedOnClick,
    };

    const renderRegularButton = () => {
      const utils = render(<RegularButton {...props} />);
      const button = utils.getByText(props.children);

      return {
        ...utils,
        button,
      };
    };

    test('it renders with the right props', () => {
      const { button } = renderRegularButton();

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(props.children);
      expect(button).toHaveAttribute('type', 'button');
    });

    test('on click, handler is called', () => {
      const { button } = renderRegularButton();

      fireEvent.click(button);

      expect(mockedOnClick).toHaveBeenCalledTimes(1);
    });

    test('it renders with the right styles', () => {
      const { button } = renderRegularButton();

      expect(button).toHaveStyle('background-color: #e74c3c');
      expect(button).toHaveStyle('color: #fff');
    });

    test('transparent <RegularButton /> renders with the right styles', () => {
      const { getByText } = render(<RegularButton {...props} color="transparent" />);
      const button = getByText(props.children);

      expect(button).toHaveStyle('background-color: transparent');
      expect(button).toHaveStyle('color: #e74c3c');
    });
  });
});
