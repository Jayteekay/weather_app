const { render, screen, cleanup, waitFor } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: Search } = require("..");

beforeEach(() => {
  fetch.resetMocks();
});
afterEach(cleanup);
afterAll(() => jest.unmock("../../../hooks/useFetch"));

describe("Search", () => {
  beforeEach(cleanup);
  it('should have an input with placeholder that has "Search"', () => {
    render(<Search />);
    expect(screen.queryByPlaceholderText(/Search/)).toBeInTheDocument();
  });
  it("should contain search icon when user has not typed in the input", () => {
    render(<Search />);
    expect(screen.queryByTestId("icon")).toBeInTheDocument();
  });
  it("should not contain search icon when user has typed in the input but should contain result", async () => {
    render(<Search />);
    userEvent.type(screen.getByPlaceholderText(/Search/), "a");
    await waitFor(() =>
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByTestId("results")).toBeInTheDocument()
    );
  });
  it("should not call dispatchFetch until 1 second after user stops typing", async () => {
    jest.useFakeTimers();
    // fetch.mockResponseOnce(JSON.stringify({ re }));
    render(<Search />);
    userEvent.type(screen.getByPlaceholderText(/Search/), "test");

    expect(fetch).not.toHaveBeenCalled();

    await waitFor(() => jest.runAllTimers());

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
