import { render, screen, fireEvent } from '@testing-library/react'
import RangeInput from './RangeInput'

it('should render range input element', () => {
    render(
        <RangeInput 
            name         = {'Purchase Price'}
            title        = {'Down Payment'}
            defaultValue = {50000}
            rangeWidth   = {200000}
            step         = {1000}
            unit         = {'$'}
            minMaxUnit   = {'$'}
            isDarkMode   = {false}
            onChange     = {() => {}}
            comment      = {'Buy'}
        />
    );
    const title    = screen.getByText('Down Payment');
    const unit     = screen.getByText('$');
    const input    = screen.getByDisplayValue('50,000');
    const comment  = screen.getByText('Buy');
    const slider   = screen.getByDisplayValue(50000);
    const rangeMin = screen.getByText('$0');
    const rangeMax = screen.getByText('$200,000');
});

it('should update slider and min/max values', () => {
    render(
        <RangeInput 
            name         = {'Purchase Price'}
            title        = {'Down Payment'}
            defaultValue = {50000}
            rangeWidth   = {200000}
            step         = {1000}
            unit         = {'$'}
            minMaxUnit   = {'$'}
            isDarkMode   = {false}
            onChange     = {() => {}}
            comment      = {'Buy'}
        />
    );
    const input    = screen.getByDisplayValue('50,000');
    const slider   = screen.getByDisplayValue(50000);
    const rangeMin = screen.getByText('$0');
    const rangeMax = screen.getByText('$200,000');

    fireEvent.change(input, { target: { value: 250000 } });
    expect(input.value).toEqual('250,000');
    expect(rangeMin.textContent).toEqual('$200,000');
    expect(rangeMax.textContent).toEqual('$400,000');
    expect(slider.value).toEqual('250000');
});

it('should update input value', () => {
    render(
        <RangeInput 
            name         = {'Purchase Price'}
            title        = {'Down Payment'}
            defaultValue = {50000}
            rangeWidth   = {200000}
            step         = {1000}
            unit         = {'$'}
            minMaxUnit   = {'$'}
            isDarkMode   = {false}
            onChange     = {() => {}}
            comment      = {'Buy'}
        />
    );
    const input  = screen.getByDisplayValue('50,000');
    const slider = screen.getByDisplayValue(50000);
    fireEvent.change(slider, { target: { value: 150000 } });
    expect(input.value).toEqual('150,000');
});

it('should run onChange callback', () => {
    let name;
    let value;
    const handleChange = (na, val) => {
        name = na;
        value = val;
    };
    render(
        <RangeInput 
            name         = {'purchase-price'}
            title        = {'Down Payment'}
            defaultValue = {50000}
            rangeWidth   = {200000}
            step         = {1000}
            unit         = {'$'}
            minMaxUnit   = {'$'}
            isDarkMode   = {false}
            onChange     = {(name, value) => handleChange(name, value)}
            comment      = {'Buy'}
        />
    );
    const input  = screen.getByDisplayValue('50,000');
    const slider = screen.getByDisplayValue(50000);
    fireEvent.change(slider, { target: { value: 120000 } });
    expect(name).toEqual('purchase-price');
    expect(value).toEqual('120000');
    fireEvent.change(input, { target: { value: 130000 } });
    expect(name).toEqual('purchase-price');
    expect(value).toEqual('130000');
});