const { render, screen } = require("@testing-library/react");
const { default: Note } = require("..");

describe("Note", () => {
  it("should not render delete button if isNew props is true", () => {
    render(<Note isNew={true} />);
    expect(screen.queryByTestId("delete")).not.toBeInTheDocument();
  });

  it("should render delete button if isNew props is false", () => {
    render(<Note isNew={false} />);
    expect(screen.queryByTestId("delete")).toBeInTheDocument();
  });

  it("should render value passed as props in textarea", () => {
    const testValue = "test value";
    render(<Note value={testValue} />);
    expect(screen.queryByTestId("textarea")).toHaveValue(testValue);
  });
});
