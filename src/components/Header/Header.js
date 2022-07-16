import Cookies from 'universal-cookie';
import './Header.css';

export default function Header({
    isDarkMode,
    onThemeClick,
    onMenuClick,
    onBackClick
}){

    //init:
    const cookies = new Cookies();

    //handleThemeClick:
    const handleThemeClick = () => {
        if(isDarkMode === 'No'){
            onThemeClick('Yes');
            cookies.set('Is Dark Mode', 'Yes', { path: '/' });
        }else{
            onThemeClick('No');
            cookies.set('Is Dark Mode', 'No', { path: '/' });
        }
    }

    //return:
    return (
        <header className='Header'>
            <a className='appNameWrapper' href='/'>
                <h1 className='name'>spot-on</h1>
                <h2 className='description'>The car ownership cost calculator</h2>
            </a>
            <menu className='menu'>
                <input
                    type='button'
                    className='backButton'
                    onClick={onBackClick}
                />
                <div className='endButtonsContainer'>
                    <input
                        type='button'
                        className={isDarkMode === 'Yes' ? 'lightButton' : 'darkButton'}
                        title= {isDarkMode === 'Yes' ? 'Switch to light theme' : 'Switch to dark theme'}
                        onClick={()=>handleThemeClick()}
                    />
                    <input
                        type='button'
                        className='menuButton'
                        title='Menu'
                        onClick={onMenuClick}
                    />
                </div>
            </menu>
        </header>
    )

}