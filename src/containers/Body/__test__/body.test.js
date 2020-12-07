import { Provider } from "react-redux";
const { screen, cleanup, render } = require("@testing-library/react");
const { BrowserRouter: Router } = require("react-router-dom");
const { default: Body } = require("..");
const { default: store } = require("../../../redux");

jest.mock("../../../utils/asset-vectors-loader");
jest.mock("../../Main");
jest.mock("../../Details");
jest.mock("../../../elements/Prompt")

describe("Body", () => {
  afterEach(cleanup);
  it("should render body component", () => {
    render(
      <Provider store={store}>
      <Router>
        <Body />
      </Router>
      </Provider>
    );
    expect(screen.queryByTestId("body")).toBeInTheDocument();
  });
});
