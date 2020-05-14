import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, getAllByLabelText } from '@testing-library/react';
import Nav from '../components/Nav';
import { techFilters } from '../utils/helpers';

describe('<Nav />', () => {
  const filterTest = [];

  const navProps = {
    handleFilter: jest.fn(),
    filter: filterTest,
  };

  test('it renders', () => {
    const { getByRole, getAllByRole, debug } = render(<Nav {...navProps} />);

    const nav = getByRole('navigation');
    const techLogos = getAllByRole('img');
    const techDescp = nav.querySelectorAll('span');

    expect(nav).toBeInTheDocument();
    expect(techLogos.length).toBe(techFilters.length);
    expect(techDescp.length).toBe(techFilters.length);

    debug();
  });
});
