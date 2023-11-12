import { fixedPointMethod } from '../../function/rootOfequation';
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react'

const FixedPoint = () => {
    const [toleranceInput, setToleranceInput] = useState<string>('0.000001');
    const [fn, setFn] = useState('');
    const [x0, setX0] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFn(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const tolerance = Number(toleranceInput);
        const result = fixedPointMethod(fn, tolerance, x0);
        setResult(result !== null ? 'Root is:' + result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    const handleClear = (): void => {
        setToleranceInput('');
        setResult('');
        setFn('');
        setX0(0);
    }

    return (
        <>
            <div className="esan">
                <h1 className='center'>Fixed Point</h1>
                <form onSubmit={handleSubmit} className='form-padding'>
                    <div className="functionInput">
                        <TextField label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
                        <TextField label="Error (e)" variant="filled" value={toleranceInput} onChange={(e) => setToleranceInput(e.target.value)} style={{ width: '30%' }} size='small' />
                    </div>
                    <div className="guessInput">
                        <TextField label="Guess 1 (x0)" variant="filled" type="text" onChange={(e) => setX0(Number(e.target.value))} style={{ width: '50%' }} size='small' />
                    </div>
                    <div className="submitButton">
                        < Button type="submit" variant='contained' color='success'>Submit</Button>
                        <Button variant='contained' onClick={handleClear} color='error'>clear</Button>
                    </div>
                </form>
                {result}
            </div>
        </>
    );
}

export default FixedPoint;
