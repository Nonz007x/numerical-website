import { Link } from 'react-router-dom';
import { routes, Route } from './utils';

function Sidebar() {

    return (
        <div className="sidebar">
            <h1>Menu</h1>
            <ul className="menu">
                {routes.map((route: Route, index: number) => (
                    <li key={index} className='menu'>
                        <a href={route.path}>{route.path === '/' ? 'Home' : route.path.replace('/', '')}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
