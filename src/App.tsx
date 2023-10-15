import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import ReactDOM from 'react-dom';
import { routes } from './utils';
import React from 'react';
import './index.css';

const App = () => {
  return (
    <React.StrictMode>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element}>
                </Route>
              ))}
            </Routes>
          </Router>
        </div>
      </div>
    </React.StrictMode>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

export default App;
