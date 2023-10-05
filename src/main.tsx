import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bisection from './pages/root-of-equation/Bisection.tsx';
import Sidebar from './Sidebar.tsx';
import Home from './Home.tsx';
import Graphical from './pages/root-of-equation/Graphical.tsx';
import FalsePosition from './pages/root-of-equation/FalsePosition.tsx';
import FixedPoint from './pages/root-of-equation/FixedPoint.tsx';
import NewtonRaphson from './pages/root-of-equation/NewtonRaphson.tsx';


const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/"
  },
  {
    element: <Bisection />,
    path: "/bisection"
  },
  {
    element: <Graphical />,
    path: "/graphical"
  },
  {
    element: <FalsePosition />,
    path: "/falseposition"
  },
  {
    element: <FixedPoint />,
    path: "/fixedpoint"
  },
  {
    element: <NewtonRaphson />,
    path: "/newtonraphson"
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>
)
