import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "..";
require("fake-indexeddb/auto");
jest.mock("../../../hooks/useCities");

const { default: store } = require("../../../redux");

jest.mock("../../../utils/asset-vectors-loader");
jest.mock("../../ListSection");

describe("Main", () => {
  beforeEach(() => {
    window.indexedDB = jest.fn(() => null);
  });
  afterEach(() => {
    cleanup();
  });

  it("should render Main", () => {
    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
    const main = screen.queryByTestId("main");
    expect(main).toBeInTheDocument();
  });
});
