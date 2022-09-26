import { render, screen, fireEvent } from '@testing-library/react'
import SelectInput from './SelectInput'

it('should render select input element', () => {
    render(
        <SelectInput
            name     = {'Road Tax'}
            title    = {'Road Tax'}
            value    = {500}
            options  = {[250, 500, 750]}
            comment  = {'$ per year'}
            onChange = {() => {}}
        />
    );
    const title   = screen.getByText('Road Tax');
    const comment = screen.getByText('$ per year');
    const select  = screen.getByDisplayValue('500');
});

it('should run onChange callback', () => {
    let name;
    let value;
    const handleChange = (na, val) => {
        name = na;
        value = val;
    };
    render(
        <SelectInput
            name     = {'road-tax'}
            title    = {'Road Tax'}
            value    = {500}
            options  = {[250, 500, 750]}
            comment  = {'$ per year'}
            onChange = {(name, value) => {handleChange(name, value)}}
        />
    );
    const select  = screen.getByDisplayValue('500');
    fireEvent.change(select, { target: { value: 250 } });
    expect(name).toEqual('road-tax');
    expect(value).toEqual('250');
});