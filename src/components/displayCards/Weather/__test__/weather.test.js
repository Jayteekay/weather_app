const { render, screen } = require("@testing-library/react");
const { default: Weather } = require("..");

jest.mock("../../../../utils/asset-vectors-loader");

describe("Weather", () => {
  it("should weather_code, descriptions, cloudcover and feelslike passed as props", () => {
    render(<Weather descriptions={["des"]} cloudcover="cc" feelslike="fl" />);
    expect(screen.getByText(/des/)).toBeInTheDocument();
    expect(screen.getByText(/cc/)).toBeInTheDocument();
    expect(screen.getByText(/fl/)).toBeInTheDocument();
  });
});
