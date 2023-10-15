import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import Sidebar from './Sidebar.tsx';
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


const domNode = document.getElementById('root');

if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
} else {
  console.error("Element with ID 'root' not found");
}

export default App;
