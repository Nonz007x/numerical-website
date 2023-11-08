import { bisection_method2 } from './rootOfequation';
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import MurderPlot from './MurderPlot';
import { BisectionReturn } from './rootOfequation';

const Bisection = () => {
  const [toleranceInput, setToleranceInput] = useState<string>('0.000001');
  const [tolerance, setTolerance] = useState<number>(1e-6);
  const [fn, setFn] = useState('');
  const [xl, setXl] = useState<number>(0);
  const [xr, setXr] = useState<number>(0);
  const [result, setResult] = useState<BisectionReturn | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFn(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTolerance(Number(toleranceInput));
    const result = bisection_method2(fn, tolerance, xl, xr);
    setResult(result);
  };

  const handleClear = (): void => {
    setToleranceInput('');
    setResult(undefined);
    setFn('');
    setXl(0);
    setXr(0);
  }

  return (
    <>
      <div className="esan">
        <h1 className='center'>Bisection</h1>
        <form onSubmit={handleSubmit} className='form-padding'>
          <div className="functionInput">
            <TextField label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
            <TextField label="Error (e)" variant="filled" value={toleranceInput} onChange={(e) => setToleranceInput(e.target.value)} style={{ width: '30%' }} size='small' />
          </div>
          <div className="guessInput">
            <TextField label="Guess 1 (xl)" value={xl} variant="filled" type="text" onChange={(e) => setXl(Number(e.target.value))} style={{ width: '50%' }} size='small' />
            <TextField label="Guess 2 (xr)" value={xr} variant="filled" type="text" onChange={(e) => setXr(Number(e.target.value))} style={{ width: '50%' }} size='small' />
          </div>
          <div className='submitButton'>
            <Button type="submit" variant='contained' color='success'>submit</Button>
            <Button variant='contained' onClick={handleClear} color='error'>clear</Button>
          </div>
        </form>
        <MurderPlot points={result?.points}></MurderPlot>
        <div>
          Root is : {result?.xm !== null ? result?.xm : "Invalid Expression"}
        </div>
      </div>
    </>
  );
}

export default Bisection;
