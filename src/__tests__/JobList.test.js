import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import JobList from '../components/JobList';
import jobsData from '../testsdata/jobs.json';

describe('<JobList />', () => {
  const mockedDispatchJobsFetch = jest.fn();

  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}

      observe() {
        return null;
      }

      disconnect() {
        return null;
      }
    };
  });

  const testProps = {
    jobs: [...jobsData],
    loading: false,
    hasMore: true,
    totalRows: 200,
  };

  const renderComponent = (props = testProps) => {
    const utils = render(
      <JobList {...props} dispatchJobsFetch={mockedDispatchJobsFetch} />
    );

    const title = utils.getByText(/latest jobs/i);
    const jobsAmount = title.querySelector('span');

    return {
      ...utils,
      title,
      jobsAmount,
    };
  };

  test('it renders', () => {
    const { title, jobsAmount } = renderComponent();
    expect(title).toBeInTheDocument();
    expect(jobsAmount).toBeInTheDocument();
  });

  test('renders the right values when 0 jobs are passed', () => {
    const testProps = {
      jobs: [],
      loading: false,
      hasMore: false,
      totalRows: 100,
    };
    const { debug, jobsAmount } = renderComponent(testProps);

    expect(jobsAmount.textContent).toContain(testProps.totalRows);
  });
});
