import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { LinkButton } from '../components/Button';

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

    test('transparent LinkButton renders with the right styles', () => {
      const { getByText } = render(<LinkButton {...props} color="transparent" />);
      const button = getByText(props.children);

      expect(button).toHaveStyle('background-color: transparent');
      expect(button).toHaveStyle('color: #e74c3c');
    });
  });
});
