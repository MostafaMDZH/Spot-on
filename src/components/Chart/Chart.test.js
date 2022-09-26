import { render, screen, fireEvent } from '@testing-library/react'
import Chart from './Chart'

it('should render the chart', () => {
    render(
        <Chart
            currency = {['Dollar', '$']}
            data = {[
                { name: 'Dep', title: 'Depreciation'           , value: 5000 },
                { name: 'T&I', title: 'Tax & Insurance'        , value: 1500 },
                { name: 'W&M', title: 'Warranty & Maintenance' , value: 2000 },
                { name: 'Ser', title: 'Service'                , value: 1000 },
                { name: 'Fue', title: 'Fuel'                   , value: 3000 },
            ]}
        />
    );

    const level3 = screen.getByText('5K');
    const level2 = screen.getByText('3.4K');
    const level1 = screen.getByText('1.7K');
    const level0 = screen.getByText('0');

    const dep = screen.getByText('Dep');
    const ti  = screen.getByText('T&I');
    const wm  = screen.getByText('W&M');
    const ser = screen.getByText('Ser');
    const fue = screen.getByText('Fue');
    
    const depTitle = screen.getByText('$5K');
    const tiTitle  = screen.getByText('$1.5K');
    const wmTitle  = screen.getByText('$2K');
    const serTitle = screen.getByText('$1K');
    const fueTitle = screen.getByText('$3K');

    const depLabel = screen.getByText('Depreciation');
    const tiLabel  = screen.getByText('Tax & Insurance');
    const wmLabel  = screen.getByText('Warranty & Maintenance');
    const serLabel = screen.getByText('Service');
    const fueLabel = screen.getByText('Fuel');

});