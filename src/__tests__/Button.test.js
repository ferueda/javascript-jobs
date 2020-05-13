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

    test('it renders', () => {
      const { getByText } = render(<LinkButton {...props} />);

      const button = getByText(props.children);

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(props.children);
    });
  });
});
