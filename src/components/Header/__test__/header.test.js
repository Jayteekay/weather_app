const { render, screen, cleanup } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { default: Header } = require("..");
const { default: store } = require("../../../redux");

describe('Header', function() {
    beforeEach(()=>{
        render(<Provider store={store}><Header/></Provider>);
    });
    afterEach(cleanup);
    it('should contain app name "Weather App"', ()=>{
        expect(screen.queryByText("Weather App")).toBeInTheDocument();
    })
    it('should contain search', ()=>{
        expect(screen.queryByTestId("search")).toBeInTheDocument();
    })
});
    