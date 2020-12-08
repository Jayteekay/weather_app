import { BrowserRouter as Router } from "react-router-dom";

const { render, cleanup, screen, waitFor } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { default: City } = require("..");
const { default: store } = require("../../../redux");
require("fake-indexeddb/auto");

jest.mock("../../../utils/asset-vectors-loader");

describe("City", () => {
  afterEach(cleanup);

  it("should render city card without error", async () => {
    render(
      <Provider store={store}>
        <Router>
          <City />
        </Router>
      </Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("city_card")).toBeInTheDocument()
    );
  });

  it("should show temperature passed as props", async () => {
    const temperature = 2.7;
    render(
      <Provider store={store}>
        <Router>
          <City temperature={temperature} />
        </Router>
      </Provider>
    );
    await waitFor(() => expect(screen.queryByText(/2.7/)).toBeInTheDocument());
  });
});
