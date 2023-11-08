/* eslint-disable no-constant-condition */
import * as math from 'mathjs'
import { Point } from '../../function/utils';

export function bisection_method(fn: string, tolerance: number, xl: number, xr: number): number | null {

    let f: math.EvalFunction;
    let fxm: number;
    let fxr: number;
    let xm = (xl + xr) / 2.0;

    try {
        f = math.compile(fn);
        fxm = f.evaluate({ x: xm });
        fxr = f.evaluate({ x: xr });
        if (fxm === undefined || fxm === null || fxr === undefined || fxr === null) {
            throw new Error("fxm or fxr is undefined or null");
        }
    } catch (error) {
        console.log(error);
        return null;
    }

    const maxIterations = 1000;
    let iterations = 0;
    if (f.evaluate({ x: xl }) * f.evaluate({ x: xr }) >= 0) {
        console.log("Initial guess does not bracket the root.");
        return null;
    } else {
        while (Math.abs(fxm) > tolerance && iterations < maxIterations) {
            if (fxm * fxr < 0) {
                xl = xm;
            } else {
                xr = xm;
                fxr = fxm;
            }

            xm = (xl + xr) / 2.0;
            fxm = f.evaluate({ x: xm });
            console.log(xm);
            iterations++;
        }
    }

    return xm;
}

export interface BisectionReturn {
  xm: number, 
  points: Point[],
}

export function bisection_method2(fn: string, tolerance: number, xl: number, xr: number): BisectionReturn | null {

  let f: math.EvalFunction;
  let fxm: number;
  let fxr: number;
  let xm = (xl + xr) / 2.0;
  const points: Point[] = [];

  try {
      f = math.compile(fn);
      fxm = f.evaluate({ x: xm });
      fxr = f.evaluate({ x: xr });
      if (fxm === undefined || fxm === null || fxr === undefined || fxr === null) {
          throw new Error("fxm or fxr is undefined or null");
      }
  } catch (error) {
      console.log(error);
      return null;
  }

  const maxIterations = 1000;
  let iterations = 0;
  if (f.evaluate({ x: xl }) * f.evaluate({ x: xr }) >= 0) {
      console.log("Initial guess does not bracket the root.");
      return null;
  } else {
      while (Math.abs(fxm) > tolerance && iterations < maxIterations) {
          if (fxm * fxr < 0) {
              xl = xm;
          } else {
              xr = xm;
              fxr = fxm;
          }
          points.push({x:xm, y:fxm});
          xm = (xl + xr) / 2.0;
          fxm = f.evaluate({ x: xm });
          console.log(xm);
          iterations++;
      }
  }

  return {xm: xm, points: points};
}

export function graphical_method(fn: string, tolerance: number, start: number, stop: number): number | null {
    if (Number.isNaN(tolerance) || tolerance == 0)
        return null;
    const f = math.compile(fn);
    const incrementer = tolerance;
    let x = start;
    let upperBound = stop;

    while (x < upperBound) {
        const fx = f.evaluate({ x });
        const fxPlus1 = f.evaluate({ x: x + 1 });

        if (fx === 0) {
            return x;
        } else if (fx * fxPlus1 < 0) {
            upperBound = x + 1;
            break;
        }

        x++;
    }

    while (x <= upperBound) {
        console.log(x);
        if (f.evaluate({ x: x }) >= 0) {
            break;
        }
        x += incrementer;
    }

    if (x >= upperBound)
        return null;

    return x;
}

export function newtonRaphsonMethod(initialGuess: number, tolerance: number, equation: string) {
    const MAX_ITER = 1000;
    const compiledEquation = math.compile(equation);
    const derivativeEquation = math.derivative(equation, "x");

    let x: number = initialGuess;
    let iteration: number = 0;
    try {
        while (true) {
            iteration++;
            const equationValue = compiledEquation.evaluate({ x: x }); // problem is here
            const previousX: number = x;
            x = x - (equationValue / derivativeEquation.evaluate({ x: x }));
            if (math.abs(previousX - x) < tolerance || iteration >= MAX_ITER) {
                break;
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    return x;
}

export function falsePositionMethod(fn: string, xl: number, xu: number, tolerance: number): number | null {

    let f: math.EvalFunction;
    let fl: number
    let fu: number
    try {
        f = math.compile(fn);
        fl = f.evaluate({ x: xl });
        fu = f.evaluate({ x: xu });
        if (fl === undefined || fl === null || fu === undefined || fu === null) {
            throw new Error("fl or fu is undefined or null");
        }
    } catch (error) {
        console.log(error);
        return null;
    }

    let xrold: number, fr: number, test: number;
    let xr = 0;

    do {
        xrold = xr;
        xr = xu - fu * (xl - xu) / (fl - fu);
        fr = f.evaluate({ x: xr });

        if (xr !== 0) {
            const error: number = Math.abs((xr - xrold) / xr) * 100;
            if (error < tolerance) {
                return xr; // Converged
            }
        }

        test = fl * fr;
        if (test < 0) {
            xu = xr;
        } else if (test > 0) {
            xl = xr;
        } else {
            return xr;
        }
    } while (true);
}

export function fixedPointMethod(fn: string, tolerance: number, x0: number): number | null {
    const f = math.compile(fn);
    let error: number = 0, previousX: number;

    let xr = x0;

    try {
        const fxr = f.evaluate({ x: xr });
        if (fxr === undefined || fxr === null) {
            throw new Error("fxr is undefined or null");
        }
    } catch (error) {
        console.log(error);
        return null;
    }

    do {
        previousX = xr;
        xr = f.evaluate({ x: previousX });
        if (xr != 0) {
            error = math.abs((xr - previousX) / xr) * 100;
        }
    } while (error > tolerance);

    return xr;
}

export function secantMethod(fn: string, tolerance: number,  x0: number, x1: number) {
    const f = math.compile(fn);

    let previousX: number;
    let xi = x0;

    try {
        const fx0 = f.evaluate({ x: x0 });
        const fx1 = f.evaluate({ x: x1 })
        if (fx0 === undefined || fx0 === null || fx1 === undefined || fx1 === null) {
            throw new Error("fx0 or fx1 is undefined or null");
        }

        if (Math.abs(x0) == Math.abs(x1)) {
            throw new Error("x0 and x1 cannot be same value");
        }

    } catch (error) {
        console.log(error);
        return null;
    }
    do {
        console.log(xi);
        previousX = xi;
        xi = x0 - (f.evaluate({ x: x0 }) * (x0 - x1)) / (f.evaluate({ x: x0 }) - f.evaluate({ x: x1 }));
        x0 = x1;
        x1 = xi;
    } while (Math.abs((xi - previousX) / xi) * 100 > tolerance);
    return xi;
}