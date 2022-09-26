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