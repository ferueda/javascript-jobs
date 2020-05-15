import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';
import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import Nav from '../components/Nav';
import { techFilters } from '../utils/helpers';

describe('<Nav />', () => {
  const filterTest = [];
  const mockedHandleFilters = jest.fn();

  const navProps = {
    handleFilters: mockedHandleFilters,
    filter: filterTest,
  };

  const renderComponent = () => {
    const utils = render(<Nav {...navProps} />);

    const nav = utils.getByRole('navigation');
    const techLogos = utils.getAllByRole('img');
    const techDescp = nav.querySelectorAll('span');

    return {
      ...utils,
      nav,
      techLogos,
      techDescp,
    };
  };

  test('it renders', async () => {
    const { nav, techLogos, techDescp } = renderComponent();

    expect(nav).toBeInTheDocument();
    expect(techLogos.length).toBe(techFilters.length);
    expect(techDescp.length).toBe(techFilters.length);
  });

  test('on click, handler is called', async () => {
    const { techDescp } = renderComponent();
    const clickedLogo = techDescp[2];

    user.click(clickedLogo);

    expect(mockedHandleFilters).toHaveBeenCalledTimes(1);
    expect(mockedHandleFilters).toHaveBeenCalledWith(
      clickedLogo.textContent.toLowerCase()
    );
  });

  test('with filters, "active" css class is active', () => {
    const testFilters = ['javascript', 'angular'];
    const { getByRole } = render(<Nav {...navProps} filter={testFilters} />);

    const nav = getByRole('navigation');
    const withActiveClass = nav.querySelectorAll('.active');

    expect(withActiveClass).toHaveLength(testFilters.length);
  });
});
