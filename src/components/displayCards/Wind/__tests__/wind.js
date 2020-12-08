const { render, screen } = require("@testing-library/react");
const { default: Wind } = require("..");

describe("Wind", () => {
  it("should speed, degree and direction passed as props", () => {
    render(<Wind speed="speed" degree="deg" dir="dir" />);
    expect(screen.getByText(/speed/)).toBeInTheDocument();
    expect(screen.getByText(/deg/)).toBeInTheDocument();
    expect(screen.getByText(/dir/)).toBeInTheDocument();
  });
});
