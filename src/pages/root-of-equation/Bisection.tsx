import React, { useState } from 'react'
import * as math from 'mathjs'

const Bisection = () => {
  const { sqrt, pow, sin, cos, tan } = math;
  const [tolerance, setTolerance] = useState<number>(1e-6);
  const [fn, setFn] = useState('');
  const [xl, setXl] = useState<number>(0);
  const [xr, setXr] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);


  function bisection_method(fn: string, xl: number, xr: number): number | null {

    const f = math.compile(fn);


    let xm = (xl + xr) / 2.0;
    let fxm = f.evaluate({ x: xm });
    let fxr = f.evaluate({ x: xr });


    const maxIterations = 100;


    let iterations = 0;
    while (math.abs(fxm) > tolerance && iterations < maxIterations) {
      if (fxm * fxr < 0) {
        xl = xm;
      } else {
        xr = xm;
        fxr = fxm;
      }

      xm = (xl + xr) / 2.0;
      fxm = f.evaluate({ x: xm });

      iterations++;
    }

    if (iterations === maxIterations) {
      return null;
    }

    return xm;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFn(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = bisection_method(fn, xl, xr);
    setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
  };

  return (
    <>
      Bisection
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTolerance(Number(e.target.value))} placeholder="Tolerance" />
        <input type="text" onChange={(e) => setXl(Number(e.target.value))} placeholder="xl" />
        <input type="text" onChange={(e) => setXr(Number(e.target.value))} placeholder="xr" />
        <input type="text" onChange={handleChange} value={fn} placeholder="Function" />
        <button type="submit">Submit</button>
      </form>
      {tolerance} <br />
      {xl}
      <div>
        Result: {result !== null ? result : "Invalid Expression"}
      </div>
    </>
  );
}

export default Bisection;
