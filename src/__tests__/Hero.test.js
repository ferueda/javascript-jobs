import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Hero from '../components/Hero';

describe('<Hero />', () => {
  const mockedHandleSearch = jest.fn();
  const mockedHandleCitySelection = jest.fn();

  const props = {
    handleSearch: mockedHandleSearch,
    city: 'TEST_CITY',
    handleCitySelection: mockedHandleCitySelection,
  };

  test('it renders', () => {
    const { getByText, getByRole, getByTestId } = render(<Hero {...props} />);

    const container = getByRole(/container/i);
    const title = getByText(/javascript/i);
    const form = getByTestId(/keyword-form/i);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test('it renders the backgroud images', () => {
    const { getByRole } = render(<Hero {...props} city="sydney" />);

    const container = getByRole(/container/i);

    expect(container).toHaveStyle('background-image:');
  });
});
