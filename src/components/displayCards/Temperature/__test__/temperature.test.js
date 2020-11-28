const { render, screen } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { default: Temperature } = require("..");
const { default: store } = require("../../../../redux");

jest.mock("../../../../utils/asset-vectors-loader");

describe("Temperature", () => {
  it("should render temperature component", () => {
    render(
      <Provider store={store}>
        <Temperature value={20} />
      </Provider>
    );
    expect(screen.getByTestId("temperature")).toBeInTheDocument();
  });
});
