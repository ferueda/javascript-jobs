import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Search from './Search';

describe("Hero's Search component", () => {
  const searchProps = {
    placeholder: 'TEST_PLACEHOLDER',
    city: 'TEST_CITY',
  };

  test('the form is accessible', async () => {
    const { container } = render(<Search {...searchProps} />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
