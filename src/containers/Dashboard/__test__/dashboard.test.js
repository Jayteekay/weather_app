import { cleanup, render, screen } from '@testing-library/react';
import Dashboard from '..';

describe('Dashboard', ()=>{

    afterEach(cleanup);

    it('should render dashboard', ()=>{
        render(<Dashboard/>);
        const dashboard = screen.queryByTestId("dashboard");
        expect(dashboard).toBeInTheDocument();
    })

    it('should render header', ()=>{
        render(<Dashboard/>);
        const header = screen.queryByTestId("header");
        expect(header).toBeInTheDocument();
    })

})