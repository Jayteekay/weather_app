const { render, screen } = require("@testing-library/react");
const { default: Header } = require("..");

describe('Header', function() {
    it('should contain app name "Weather App"', ()=>{
        render(<Header/>);
        expect(screen.queryByText("Weather App")).toBeInTheDocument();
    })
    it('should contain search', ()=>{
        render(<Header/>);
        expect(screen.queryByTestId("search")).toBeInTheDocument();
    })
});
    