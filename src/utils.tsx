import Bisection from './pages/root-of-equation/Bisection.tsx';
import Home from './Home.tsx';
import Graphical from './pages/root-of-equation/Graphical.tsx';
import FalsePosition from './pages/root-of-equation/FalsePosition.tsx';
import FixedPoint from './pages/root-of-equation/FixedPoint.tsx';
import NewtonRaphson from './pages/root-of-equation/NewtonRaphson.tsx';
import Secant from './pages/root-of-equation/Secant.tsx';


export interface Route {
  path: string;
  name: string;
  element: JSX.Element;
}

export const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />
  },
  {
    path: "/bisection",
    name: "Bisection",
    element: <Bisection />
  },
  {
    path: "/graphical",
    name: "Graphical",
    element: <Graphical />
  },
  {
    path: "/falseposition",
    name: "False Position",
    element: <FalsePosition />
  },
  {
    path: "/fixedpoint",
    name: "Fixed Point",
    element: <FixedPoint />
  },
  {
    path: "/newtonraphson",
    name: "Newton Raphson",
    element: <NewtonRaphson />
  },
  {
    path: "/secant",
    name: "Secant",
    element: <Secant />
  }
];