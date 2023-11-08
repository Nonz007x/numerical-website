import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { GraphicalReturn, graphical_method2 } from './rootOfequation';
import MurderPlot from './MurderPlot';

const Graphical = () => {
  const [toleranceInput, setToleranceInput] = useState<string>('0.00001');
  const [fn, setFn] = useState('');
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [result, setResult] = useState<GraphicalReturn | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFn(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const tolerance = Number(toleranceInput);
    const result = graphical_method2(fn, tolerance, start, stop);
    setResult(result);
    // setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
  };

  const handleClear = (): void => {
    setToleranceInput('');
    setResult(undefined);
    setStart(0);
    setStop(0);
    setFn('');
  }

  return (
    <>
      <div className="esan">
        <h1 className='center'>Graphical</h1>
        <form onSubmit={handleSubmit} className='form-padding'>
          <div className="functionInput">
            <TextField label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
            <TextField label="Error (e)" variant="filled" value={toleranceInput} onChange={(e) => setToleranceInput(e.target.value)} style={{ width: '30%' }} size='small' />
          </div>
          <div className="guessInput">
            <TextField label="Start" variant="filled" onChange={(e) => setStart(Number(e.target.value))} style={{ width: '100%' }} size='small' />
            <TextField label="Stop" variant="filled" onChange={(e) => setStop(Number(e.target.value))} style={{ width: '100%' }} size='small' />
          </div>
          <div className="submitButton">
            <Button type="submit" variant='contained' color='success'>submit</Button>
            <Button variant='contained' color='error' onClick={handleClear}>clear</Button>
          </div>
        </form>
        <MurderPlot points={result?.points}></MurderPlot>
        <div>
          Root is : {result?.x}
        </div>
      </div>
    </>
  );
}

export default Graphical;