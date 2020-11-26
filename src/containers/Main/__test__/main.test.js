import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "..";
const { default: store } = require("../../../redux");

describe("Main", () => {
  afterEach(cleanup);

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
