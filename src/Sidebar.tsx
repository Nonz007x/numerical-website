import { routes, Route } from './utils';
import './css/sidebar.css';

function Sidebar() {

    return (
        <div className="sidebar">
            <h1>Menu</h1>
            <ul className="menu">
                {routes.map((route: Route, index: number) => (
                    <li key={index} className='menu'> 
                        <a href={route.path}>{route.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
