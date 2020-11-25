const { render, screen, cleanup } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: Search } = require("..")

describe('Search', ()=>{
    beforeEach(cleanup);
    it('should have an input with placeholder that has "Search"',()=>{
        render(<Search />)
        expect(screen.queryByPlaceholderText(/Search/)).toBeInTheDocument();
    })
    it('should contain search icon when user has not typed in the input', ()=>{
        render(<Search />)
        expect(screen.queryByTestId('icon')).toBeInTheDocument();
    })
    it('should not contain search icon when user has typed in the input but should contain result', ()=>{
        render(<Search />)
        userEvent.type(screen.getByPlaceholderText(/Search/), 'a');
        expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('results')).toBeInTheDocument();
    })
})