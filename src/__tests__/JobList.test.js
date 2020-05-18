import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
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

  afterEach(cleanup);

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
    const cardsContainer = utils.getByRole('container');
    const jobCards = utils.queryAllByTestId('jobcard');
    const jobCardsSkeleton = utils.queryAllByTestId('jobcard skeleton');

    return {
      ...utils,
      title,
      jobsAmount,
      cardsContainer,
      jobCards,
      jobCardsSkeleton,
    };
  };

  test('it renders', () => {
    const { title, jobsAmount, cardsContainer, jobCards } = renderComponent();

    expect(title).toBeInTheDocument();
    expect(jobsAmount).toBeInTheDocument();
    expect(cardsContainer).toBeInTheDocument();
    expect(jobCards.length).not.toBe(0);
  });

  test('renders the right values when 0 jobs are passed', () => {
    const testProps = {
      jobs: [],
      loading: false,
      hasMore: false,
      totalRows: 100,
    };
    const { jobsAmount, jobCards, jobCardsSkeleton } = renderComponent(
      testProps
    );

    expect(jobsAmount.textContent).toContain(testProps.totalRows);
    expect(jobCards).toHaveLength(testProps.jobs.length);
    expect(jobCardsSkeleton).toHaveLength(0);
  });

  test('loading component is rendered when state is loading', () => {
    const testProps = {
      jobs: [],
      loading: true,
      hasMore: true,
      totalRows: 200,
    };

    const { jobsAmount, jobCards, jobCardsSkeleton } = renderComponent(
      testProps
    );

    expect(jobsAmount.textContent).not.toBe(0);
    expect(jobCardsSkeleton).toHaveLength(3);
    expect(jobCards).toHaveLength(0);
  });
});
