import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

it('should render the header', () => {
    render(
        <Header
            isDarkMode   = {'No'}
            isMenuRotate = {false}
            onThemeClick = {()=>{}}
            onMenuClick  = {()=>{}}
        />
    );
    const appName        = screen.getByText('spot-on');
    const appDescription = screen.getByText('The car ownership cost calculator');
    const backButton     = screen.getByTitle('Back');
    const themeButton    = screen.getByTitle('Switch to dark theme');
    const menuButton     = screen.getByTitle('Menu');
});

it('should render the light theme button', () => {
    render(
        <Header
            isDarkMode   = {'Yes'}
            isMenuRotate = {false}
            onThemeClick = {()=>{}}
            onMenuClick  = {()=>{}}
        />
    );
    const themeButton = screen.getByTitle('Switch to light theme');
});

// it('should update slider and min/max values', () => {
//     render(
//         <Header 
//             name         = {'Purchase Price'}
//             title        = {'Down Payment'}
//             defaultValue = {50000}
//             rangeWidth   = {200000}
//             step         = {1000}
//             unit         = {'$'}
//             minMaxUnit   = {'$'}
//             isDarkMode   = {false}
//             onChange     = {() => {}}
//             comment      = {'Buy'}
//         />
//     );
//     const input    = screen.getByDisplayValue('50,000');
//     const slider   = screen.getByDisplayValue(50000);
//     const rangeMin = screen.getByText('$0');
//     const rangeMax = screen.getByText('$200,000');

//     fireEvent.change(input, { target: { value: 250000 } });
//     expect(input.value).toEqual('250,000');
//     expect(rangeMin.textContent).toEqual('$200,000');
//     expect(rangeMax.textContent).toEqual('$400,000');
//     expect(slider.value).toEqual('250000');
// });

// it('should update input value', () => {
//     render(
//         <Header 
//             name         = {'Purchase Price'}
//             title        = {'Down Payment'}
//             defaultValue = {50000}
//             rangeWidth   = {200000}
//             step         = {1000}
//             unit         = {'$'}
//             minMaxUnit   = {'$'}
//             isDarkMode   = {false}
//             onChange     = {() => {}}
//             comment      = {'Buy'}
//         />
//     );
//     const input  = screen.getByDisplayValue('50,000');
//     const slider = screen.getByDisplayValue(50000);
//     fireEvent.change(slider, { target: { value: 150000 } });
//     expect(input.value).toEqual('150,000');
// });