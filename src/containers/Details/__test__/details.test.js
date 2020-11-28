const { render, screen, cleanup, waitFor } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { default: Details } = require("..");
const { default: store } = require("../../../redux");
require("fake-indexeddb/auto");

jest.mock("../../../utils/asset-vectors-loader");
jest.mock("../../../components/displayCards/Humidity");
jest.mock("../../../components/displayCards/Pressure");
jest.mock("../../../components/displayCards/Temperature");
jest.mock("../../../components/displayCards/Weather");
jest.mock("../../../components/displayCards/Wind");
jest.mock("../../../components/Note");

describe("Details", () => {
  beforeEach(async () => {
    await waitFor(() =>
      render(
        <Provider store={store}>
          <Details match={{ params: { city: "C", country: "Co" } }} />
        </Provider>
      )
    );
  });
  afterEach(cleanup);
  it("should render component", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("details")).toBeInTheDocument()
    );
  });
  it("should display header", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("details-header")).toBeInTheDocument()
    );
  });
  it("should display actions", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("details-actions")).toBeInTheDocument()
    );
  });
  it("should display details", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("details-body")).toBeInTheDocument()
    );
  });
  it("should display notes", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("details-notes")).toBeInTheDocument()
    );
  });
});
