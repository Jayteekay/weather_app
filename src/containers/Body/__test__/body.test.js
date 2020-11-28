const { screen, cleanup, render } = require("@testing-library/react");
const { BrowserRouter: Router } = require("react-router-dom");
const { default: Body } = require("..");

jest.mock("../../../utils/asset-vectors-loader");
jest.mock("../../Main");
jest.mock("../../Details");

describe("Body", () => {
  afterEach(cleanup);
  it("should render body component", () => {
    render(
      <Router>
        <Body />
      </Router>
    );
    expect(screen.queryByTestId("body")).toBeInTheDocument();
  });
});
