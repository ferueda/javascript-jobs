import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';
import React from 'react';
import { render } from '@testing-library/react';
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
    expect(nav).toMatchInlineSnapshot(`
      <nav
        class="sc-AxjAm iYPdSF"
      >
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Front end logo"
              src="assets/logos/Front end.svg"
            />
          </div>
          <span>
            Front end
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Back end logo"
              src="assets/logos/Back end.svg"
            />
          </div>
          <span>
            Back end
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="JavaScript logo"
              src="assets/logos/JavaScript.svg"
            />
          </div>
          <span>
            JavaScript
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="React logo"
              src="assets/logos/React.svg"
            />
          </div>
          <span>
            React
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Vue logo"
              src="assets/logos/Vue.svg"
            />
          </div>
          <span>
            Vue
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Angular logo"
              src="assets/logos/Angular.svg"
            />
          </div>
          <span>
            Angular
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Node logo"
              src="assets/logos/Node.svg"
            />
          </div>
          <span>
            Node
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="TypeScript logo"
              src="assets/logos/TypeScript.svg"
            />
          </div>
          <span>
            TypeScript
          </span>
        </div>
      </nav>
    `);
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
    expect(nav).toMatchInlineSnapshot(`
      <nav
        class="sc-AxjAm iYPdSF"
      >
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Front end logo"
              src="assets/logos/Front end.svg"
            />
          </div>
          <span>
            Front end
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Back end logo"
              src="assets/logos/Back end.svg"
            />
          </div>
          <span>
            Back end
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca active"
        >
          <div>
            <img
              alt="JavaScript logo"
              src="assets/logos/JavaScript.svg"
            />
          </div>
          <span>
            JavaScript
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="React logo"
              src="assets/logos/React.svg"
            />
          </div>
          <span>
            React
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Vue logo"
              src="assets/logos/Vue.svg"
            />
          </div>
          <span>
            Vue
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca active"
        >
          <div>
            <img
              alt="Angular logo"
              src="assets/logos/Angular.svg"
            />
          </div>
          <span>
            Angular
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="Node logo"
              src="assets/logos/Node.svg"
            />
          </div>
          <span>
            Node
          </span>
        </div>
        <div
          class="sc-AxirZ cTwJca"
        >
          <div>
            <img
              alt="TypeScript logo"
              src="assets/logos/TypeScript.svg"
            />
          </div>
          <span>
            TypeScript
          </span>
        </div>
      </nav>
    `);
  });
});
