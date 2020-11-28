import { cleanup, render, screen } from "@testing-library/react";
import Dashboard from "..";

jest.mock("../../../redux");
jest.mock("../../Body");
jest.mock("../../../components/Header");

describe("Dashboard", () => {
  afterEach(cleanup);

  it("should render dashboard", () => {
    render(<Dashboard />);
    const dashboard = screen.queryByTestId("dashboard");
    expect(dashboard).toBeInTheDocument();
  });

  it("should render header", () => {
    render(<Dashboard />);
    const header = screen.queryByTestId("header-mock");
    expect(header).toBeInTheDocument();
  });
});
