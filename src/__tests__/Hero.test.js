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
    expect(container).toMatchInlineSnapshot(`
      <div
        class="sc-fzozJi enguNp"
        role="container"
      >
        <h1
          class="sc-fzoLsD cUTVbX"
        >
          <a
            href="/"
          >
            JavaScript 
            <span>
              Jobs
            </span>
          </a>
        </h1>
        <div
          class="sc-AxjAm hdHgIu"
        >
          <form
            class="sc-AxhCb ZaNiK"
            data-testid="keyword-form"
          >
            <input
              aria-label="keyword input"
              class="sc-AxirZ llFIcl"
              name="tech"
              placeholder="Enter a keyword"
              type="text"
              value=""
            />
            <button
              aria-label="search keyword"
              class="sc-AxiKw hjBueW"
            >
              <svg
                aria-label="search button"
                fill="black"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
                <path
                  d="M0 0h24v24H0z"
                  fill="none"
                />
              </svg>
            </button>
          </form>
          <select
            aria-label="select city"
            class="sc-AxhUy hQUuku"
            id="cityDopdown"
          >
            <option
              value="sydney"
            >
              Sydney
            </option>
            <option
              value="melbourne"
            >
              Melbourne
            </option>
          </select>
        </div>
        <div
          class="sc-fzpans dypQxp"
        >
          <button
            class="sc-Axmtr gxbukr"
            type="button"
          >
            Post a job
          </button>
        </div>
      </div>
    `);
  });

  test('it renders the backgroud images', () => {
    const { getByRole } = render(<Hero {...props} city="sydney" />);

    const container = getByRole(/container/i);

    expect(container).toHaveStyle('background-image:');
  });
});
