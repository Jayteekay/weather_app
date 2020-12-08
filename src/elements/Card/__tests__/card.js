import { cleanup, render, screen } from "@testing-library/react";
import Card from "..";

describe("Card", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Card with children", () => {
    const test = "test";
    render(
      <Card>{test}</Card>
    );
    const card = screen.queryByText(test);
    expect(card).toBeInTheDocument();
  });
});
