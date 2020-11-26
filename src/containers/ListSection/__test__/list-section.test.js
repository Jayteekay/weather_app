const { render, screen, cleanup } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { BrowserRouter: Router } = require("react-router-dom");
const { default: ListSection } = require("..");
const { default: store } = require("../../../redux");

describe('ListSection', function() {
    afterEach(cleanup);
    it('should contain list title passed as prop', ()=>{
        const title = "test_title";
        render(<Provider store={store}><ListSection title={title}/></Provider>);

        expect(screen.queryByText(title)).toBeInTheDocument();
    })

    it('should contain list icon passed as prop', ()=>{
        const icon = "test_icon";
        render(<Provider store={store}><ListSection icon={icon}/></Provider>);

        expect(screen.queryByText(icon)).toBeInTheDocument();
    })

    it('should contain list of cities passed as prop', ()=>{
        const cities = [
            {
                id: 1,
            },{
                id: 2,
            },{
                id: 3,
            },{
                id: 4,
            },
        ];
        render(<Provider store={store}>
            <Router>
            <ListSection cities={cities}/>
            </Router>
            </Provider>);

        expect(screen.queryAllByTestId("city").length).toEqual(4);
    })
});
    