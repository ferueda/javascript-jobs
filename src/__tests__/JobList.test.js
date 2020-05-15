import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import JobList from '../components/JobList';

describe('<JobList />', () => {
  const mockedDispatchJobsFetch = jest.fn();

  const testProps = {
    jobs: [],
    loading: false,
    hasMore: true,
    dispatchJobsFetch: mockedDispatchJobsFetch,
    totalRows: 200,
  };

  test('it renders', () => {
    const { debug } = render(<JobList {...testProps} />);
    debug();
  });
});
