import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, getAllByTestId } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchGuide from '../components/SearchGuide';

describe('<SearchGuide />', () => {
  const testFilter = [];
  const mockedHandleTagRemove = jest.fn();

  const props = {
    filter: testFilter,
    handleTagRemove: mockedHandleTagRemove,
  };

  test('it renders', () => {
    const { getByText } = render(<SearchGuide {...props} />);

    const element = getByText(/searching/i);

    expect(element).toBeInTheDocument();
  });

  test('do not render filter tags when filter is empty', () => {
    const { getAllByTestId } = render(<SearchGuide {...props} />);

    expect(getAllByTestId('tech filter'));
  });

  test('renders with the right filter tags when filter is not empty', () => {
    const filters = ['javascript', 'angular'];
    const { debug, getAllByTestId } = render(
      <SearchGuide {...props} filter={filters} />
    );

    const filterSpans = getAllByTestId('tech filter');

    expect(filterSpans).toHaveLength(filters.length);
    expect(filterSpans[0].textContent).toContain(filters[0]);
    expect(filterSpans[1].textContent).toContain(filters[1]);

    debug();
  });

  // test('on click, calls handler', () => {
  //   const filters = ['javascript', 'angular'];
  //   const { debug, getByText } = render(
  //     <SearchGuide {...props} filter={filters} />
  //   );

  //   debug();
  // });
});
