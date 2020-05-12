import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  const componentProps = {
    placeholder: 'Enter something',
    city: 'Santiago',
  };

  const component = render(<Search {...componentProps} />);

  expect(component.container.nodeType).toBe('text');
});
