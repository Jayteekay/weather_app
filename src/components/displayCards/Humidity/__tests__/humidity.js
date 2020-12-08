const { render, screen } = require("@testing-library/react");
const { default: Humidity } = require("..");

describe("Humidity", () => {
  it("should render humidity component with value props passed", () => {
    render(<Humidity value={20} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
