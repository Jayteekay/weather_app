const { render, screen, cleanup, waitFor, getByText } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { Provider } = require("react-redux");
const { default: UnitSwitch } = require("..");
const { default: store } = require("../../../redux");
const { LOCAL_STORAGE_PREFIX, KEY_TEMPERATURE_UNIT, TEMPERATURE_UNIT_CELCIUS, TEMPERATURE_UNIT_FAHRENHEIT } = require("../../../utils/constants");

describe('UnitSwitch', ()=>{

    beforeEach(()=>{
        Object.defineProperty(window, "localStorage", {
            value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null)
            },
            writable: true
        });
        render(<Provider store={store}><UnitSwitch/></Provider>)
    })
    afterEach(cleanup);

    it('should contain buttons with contents °F and °C',()=>{
        expect(screen.queryAllByRole('button').length).toEqual(2);
        expect(screen.queryByText('\u{2103}')).toBeInTheDocument()
        expect(screen.queryByText('\u{2109}')).toBeInTheDocument()
    })

    it('should call localStorage with temperature unit key on render', ()=>{
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(window.localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_PREFIX + KEY_TEMPERATURE_UNIT);
    })
    
    it('should disable button when clicked', async ()=>{
        userEvent.click(screen.getByText('\u{2109}'));
        expect(screen.queryByText('\u{2109}')).toBeDisabled()
    })
})