import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, getAllByTestId } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchGuide from "../components/SearchGuide";

describe("<SearchGuide />", () => {
  const testFilter = [];
  const mockedHandleTagRemove = jest.fn();

  const testProps = {
    filter: testFilter,
    handleTagRemove: mockedHandleTagRemove,
  };

  const renderComponent = (props = testProps) => {
    const utils = render(<SearchGuide {...props} />);

    const element = utils.getByText(/searching/i);
    const techFilters = utils.queryAllByTestId("tech filter");

    return {
      ...utils,
      element,
      techFilters,
    };
  };

  test("it renders", () => {
    const { element } = renderComponent();
    expect(element).toBeInTheDocument();
    expect(element).toMatchInlineSnapshot(`
      <div
        class="sc-AxjAm gsZbhr"
      >
        Searching for:
      </div>
    `);
  });

  test("do not render filter tags when no filter is selected", () => {
    const { techFilters } = renderComponent();
    expect(techFilters).toHaveLength(0);
  });

  test("renders with the right filter tags when filters are selected", () => {
    const filters = ["javascript", "angular"];
    const props = { ...testProps, filter: [...filters] };

    const { techFilters } = renderComponent(props);

    expect(techFilters).toHaveLength(filters.length);
    expect(techFilters[0].textContent).toContain(filters[0]);
    expect(techFilters[1].textContent).toContain(filters[1]);
    expect(techFilters).toMatchInlineSnapshot(`
      Array [
        <span
          class="sc-AxirZ cgXzqD"
          data-testid="tech filter"
        >
          javascript
          <span>
            X
          </span>
        </span>,
        <span
          class="sc-AxirZ cgXzqD"
          data-testid="tech filter"
        >
          angular
          <span>
            X
          </span>
        </span>,
      ]
    `);
  });

  test("on click calls handler", () => {
    const filters = ["javascript", "angular"];
    const props = { ...testProps, filter: [...filters] };

    const { techFilters } = renderComponent(props);

    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(0);

    user.click(techFilters[0]);
    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(1);
    expect(mockedHandleTagRemove).toHaveBeenCalledWith(filters[0]);

    user.click(techFilters[1]);
    expect(mockedHandleTagRemove).toHaveBeenCalledTimes(2);
    expect(mockedHandleTagRemove).toHaveBeenCalledWith(filters[1]);
  });
});
