import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import user from "@testing-library/user-event";
import JobList from "../components/JobList";
import jobsData from "../testsdata/jobs.json";

describe("<JobList />", () => {
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
    const jobsAmount = title.querySelector("span");
    const cardsContainer = utils.getByRole("container");
    const jobCards = utils.queryAllByTestId("jobcard");
    const jobCardsSkeleton = utils.queryAllByTestId("jobcard skeleton");

    return {
      ...utils,
      title,
      jobsAmount,
      cardsContainer,
      jobCards,
      jobCardsSkeleton,
    };
  };

  test("it renders", () => {
    const { title, jobsAmount, cardsContainer, jobCards } = renderComponent();

    expect(title).toBeInTheDocument();
    expect(jobsAmount).toBeInTheDocument();
    expect(cardsContainer).toBeInTheDocument();
    expect(jobCards.length).not.toBe(0);
  });

  test("renders the right values when 0 jobs are passed", () => {
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

  test("loading component is rendered when state is loading", () => {
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

  test("renders loading component with the right jobs card", () => {
    const testProps = {
      jobs: [...jobsData],
      loading: true,
      hasMore: true,
      totalRows: 200,
    };

    const { jobsAmount, jobCards, jobCardsSkeleton } = renderComponent(
      testProps
    );

    expect(jobsAmount.textContent).toContain(testProps.totalRows);
    expect(jobCardsSkeleton).toHaveLength(3);
    expect(jobCards).toHaveLength(testProps.jobs.length);
  });

  test("jobCards render the right elements", () => {
    const testProps = {
      jobs: [...jobsData],
      loading: false,
      hasMore: true,
      totalRows: 200,
    };

    const { jobCards } = renderComponent(testProps);

    const jobCardTitle = jobCards[0].querySelector("h2");
    const jobCardCompany = jobCards[0].querySelector("h3");
    const jobCardLocation = jobCards[0].querySelector("h4");

    expect(jobCardTitle).toBeInTheDocument();
    expect(jobCardCompany).toBeInTheDocument();
    expect(jobCardLocation).toBeInTheDocument();

    expect(jobCardTitle.textContent).toBe(testProps.jobs[0].job_title);
    expect(jobCardCompany.textContent).toBe(testProps.jobs[0].company_name);
    expect(jobCardLocation.textContent).toBe(testProps.jobs[0].location);

    expect(jobCards[0].textContent).toContain(testProps.jobs[0].tags[0]);
    expect(jobCards[0].textContent).toContain(testProps.jobs[0].tags[1]);
    expect(jobCards[0].textContent).toContain(testProps.jobs[0].tags[2]);

    expect(jobCards[0]).toMatchInlineSnapshot(`
      <div
        class="sc-AxheI htsvqw"
        data-testid="jobcard"
      >
        <div
          class="sc-Axmtr dqiqxI"
        >
          OU
        </div>
        <div
          class="sc-fzozJi OYKcP"
        >
          <h3>
            Open Universities Australia
          </h3>
          <h2>
            Engineering Lead
          </h2>
          <h4>
            Docklands VIC
          </h4>
        </div>
        <div
          class="sc-fzoLsD kMLnbJ"
        />
        <div
          class="sc-fzpans jPZBWT"
        >
          <span
            class="sc-fzplWN kLBfpF"
            name="javascript"
          >
            javascript
          </span>
          <span
            class="sc-fzplWN kLBfpF"
            name="react"
          >
            react
          </span>
          <span
            class="sc-fzplWN kLBfpF"
            name="node"
          >
            node
          </span>
          <span
            class="sc-fzplWN kLBfpF"
            name="typescript"
          >
            typescript
          </span>
        </div>
        <div
          class="sc-fznyAO jwTVrg"
        >
          12d
        </div>
      </div>
    `);
    expect(jobCards[testProps.jobs.length - 1]).toMatchInlineSnapshot(`
      <div
        class="sc-AxheI htsvqw"
        data-testid="jobcard"
      >
        <div
          class="sc-Axmtr dqiqxI"
        >
          H2
        </div>
        <div
          class="sc-fzozJi OYKcP"
        >
          <h3>
            H2X
          </h3>
          <h2>
            Startup CTO
          </h2>
          <h4>
            Sydney NSW
          </h4>
        </div>
        <div
          class="sc-fzoLsD kMLnbJ"
        />
        <div
          class="sc-fzpans jPZBWT"
        >
          <span
            class="sc-fzplWN kLBfpF"
            name="react"
          >
            react
          </span>
        </div>
        <div
          class="sc-fznyAO jwTVrg"
        >
          14d
        </div>
      </div>
    `);
  });
});
