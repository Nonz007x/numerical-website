import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import * as math from 'mathjs'

const Graphical = () => {
  const [tolerance, setTolerance] = useState<number>(1e-6);
  const [fn, setFn] = useState('');
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  function graphical_method(fn: string, start: number, stop: number): number {
    const f = math.compile(fn);
    const incrementer = tolerance;
    let inner = 0;
    let upperBound = 0;

    for (let i = start; i < stop; i++) {
      if (f.evaluate({ x: i }) * f.evaluate({ x: i + 1 }) < 0) {
        inner = i;
        upperBound = i + 1;
        break;
      }
    }

    while (inner <= upperBound) {
      if (f.evaluate({ x: inner }) > tolerance) {
        break;
      }
      inner += incrementer;
    }

    return inner;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFn(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = graphical_method(fn, start, stop);
    setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
  };

  return (
    <>
      <div className="esan">
        <h1 className='center'>Graphical</h1>
        <form onSubmit={handleSubmit}>
          <TextField id="standard-basic" label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
          <TextField id="standard-basic" label="Error (e)" variant="filled" value={tolerance} onChange={(e) => setTolerance(Number(!e.target.value ? 1e-6 : e.target.value))} style={{ width: '100%' }} size='small' />
          <TextField id="standard-basic" label="Start" variant="filled" value={tolerance} onChange={(e) => setStart(Number(e.target.value))} style={{ width: '100%' }} size='small' />
          <TextField id="standard-basic" label="Stop" variant="filled" value={tolerance} onChange={(e) => setStop(Number(e.target.value))} style={{ width: '100%' }} size='small' />
          <Button type="submit" variant='contained' color='success'>submit</Button>
          <Button type="submit" variant='contained' color='error'>clear</Button>
        </form>
        <div>
          Result: {result !== null ? result : "Invalid Expression"}
        </div>
      </div>
    </>
  );
}

export default Graphical;