import {render, screen, cleanup} from '@testing-library/react'
import Portfolio from '../Portfolio';

test('did render Portfolio component', ()=>{
    render(<Portfolio/>);
    const portfolioElement = screen.getByTestId('portfolio-1');

    expect(portfolioElement).toBeInTheDocument();
})