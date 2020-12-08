const { render, screen } = require("@testing-library/react");
const { default: Pressure } = require("..");

describe("Pressure", () => {
  it("should render pressure component with value props passed", () => {
    render(<Pressure value={20} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
