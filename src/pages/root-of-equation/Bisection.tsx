import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import * as math from 'mathjs'

const Bisection = () => {
  const { sqrt, pow, sin, cos, tan } = math;
  const [tolerance, setTolerance] = useState<number>(1e-6);
  const [fn, setFn] = useState('');
  const [xl, setXl] = useState<number>(0);
  const [xr, setXr] = useState<number>(0);
  const [result, setResult] = useState<string | null>('');


  function bisection_method(fn: string, xl: number, xr: number): number | null {

    const f = math.compile(fn);

    let xm = (xl + xr) / 2.0;
    let fxm;
    let fxr;
    try {
      fxm = f.evaluate({ x: xm });
      fxr = f.evaluate({ x: xr });
    } catch(error) {
      console.log(error);
      return null;
    }


    const maxIterations = 1000;
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

  const handleClear = (): void => {
    setTolerance(0);
    setResult('');
    setFn('');
    setXl(0);
    setXr(0);
  }

  return (
    <>
      <div className="esan">
        <h1 className='center'>Bisection</h1>
        <form onSubmit={handleSubmit} className='form-padding'>
          <TextField id="standard-basic" label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
          <TextField id="standard-basic" label="Error (e)" variant="filled" value={tolerance} onChange={(e) => setTolerance(Number(!e.target.value ? 1e-6 : e.target.value))} style={{ width: '100%' }} size='small' />
          <div className="guessInput">
            <TextField id="standard-basic" label="Guess 1 (xl)" variant="filled" type="text" onChange={(e) => setXl(Number(e.target.value))} style={{ width: '50%' }} size='small' />
            <TextField id="standard-basic" label="Guess 2 (xr)" variant="filled" type="text" onChange={(e) => setXr(Number(e.target.value))} style={{ width: '50%' }} size='small' />
          </div>
          <div className='submitButton'>
            <Button type="submit" variant='contained' color='success'>submit</Button>
            <Button variant='contained' onClick={handleClear} color='error'>clear</Button>
          </div>
        </form>
        {tolerance} <br />
        {xl}
        <div>
          Result: {result !== null ? result : "Invalid Expression"}
        </div>
      </div>
    </>
  );
}

export default Bisection;
