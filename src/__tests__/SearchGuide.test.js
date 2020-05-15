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

  test('do not render filter tags when no filter is selected', () => {
    const { queryAllByTestId } = render(<SearchGuide {...props} />);

    expect(queryAllByTestId('tech filter')).toHaveLength(0);
  });

  test('renders with the right filter tags when filters are selected', () => {
    const filters = ['javascript', 'angular'];
    const { getAllByTestId } = render(
      <SearchGuide {...props} filter={filters} />
    );

    const filterSpans = getAllByTestId('tech filter');

    expect(filterSpans).toHaveLength(filters.length);
    expect(filterSpans[0].textContent).toContain(filters[0]);
    expect(filterSpans[1].textContent).toContain(filters[1]);
  });

  test('on click calls handler', () => {
    const filters = ['javascript', 'angular'];
    const { getAllByTestId } = render(
      <SearchGuide {...props} filter={filters} />
    );

    const filterSpans = getAllByTestId('tech filter');

    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(0);

    user.click(filterSpans[0]);
    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(1);
    expect(mockedHandleTagRemove).toHaveBeenCalledWith(filters[0]);

    user.click(filterSpans[1]);
    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(2);
    expect(mockedHandleTagRemove).toHaveBeenCalledWith(filters[1]);
  });
});
