const Header = (props) => (
    <div className="header-container">
        <div className="logo"><h1>SkyView - Weather Forecast</h1></div>
        {props.showNav && <ul className="navigaton">
            <li>Today</li>
            <li>Tomorrow</li>
            <li>Weekly Forecast</li>
        </ul>}
    </div>
)


export default Header