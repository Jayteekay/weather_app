import { BrowserRouter as Router } from "react-router-dom";

const { render, screen, cleanup } = require("@testing-library/react");
const { default: Header } = require("..");

jest.mock("../../../redux");
jest.mock("../../Search");
jest.mock("../../UnitSwitch");

describe("Header", function () {
  beforeEach(() => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });
  afterEach(cleanup);
  it('should contain app name "Weather App"', () => {
    expect(screen.queryByText("Weather App")).toBeInTheDocument();
  });
  it("should contain search", () => {
    expect(screen.queryByTestId("search-mock")).toBeInTheDocument();
  });
});
