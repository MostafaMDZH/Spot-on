import './Header.css';

export default function Header({
        onMenuClick
    }){

    //return:
    return (
        <header className="Header">
            <div className="logoWrapper">
                <a className="logo" href="/"></a>
                <div className="titleWrapper">
                    <h1 className="title"><a href="/">True Cost</a></h1>
                    <h2 className="description">Calulate the acctual ownership cost of your car</h2>
                </div>
            </div>
            <input type="button" className="menuButton" onClick={onMenuClick}/>
        </header>
    )

}