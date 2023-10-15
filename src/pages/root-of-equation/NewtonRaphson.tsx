import React, { useState } from 'react'
import * as math from 'mathjs'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const NewtonRaphson = () => {
    const { sqrt, pow, sin, cos, tan } = math;
    const [tolerance, setTolerance] = useState<number>(1e-6);
    const [fn, setFn] = useState('');
    const [x0, setX0] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    function newtonRaphsonMethod(initialGuess: number, equation: string) {
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFn(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const result = newtonRaphsonMethod(x0, fn);
        setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    return (
        <>
            <div className='esan'>
                <h1 className='center'>Newton Raphson</h1>
                <form onSubmit={handleSubmit} className='form-padding'>
                    <TextField id="standard-basic" label="Enter Function ( f(x) )" variant="filled" type="text" onChange={handleChange} value={fn} style={{ width: '100%' }} size='small' />
                    <div className='guessInput'>
                        <TextField id="standard-basic" label="Error (e)" variant="filled" value={tolerance} onChange={(e) => setTolerance(Number(!e.target.value ? 1e-6 : e.target.value))} style={{ width: '50%' }} size='small' />
                        <TextField id="standard-basic" label="Guess 1 (x0)" variant="filled" type="text" onChange={(e) => setX0(Number(e.target.value))} style={{ width: '50%' }} size='small' />
                    </div>
                    <div className='submitButton'>
                        <Button type="submit" variant='contained' color='success'>Submit</Button>
                    </div>
                </form>
                {tolerance} <br />
                {x0}
                <div>
                    Result: {result !== null ? result : "Invalid Expression"}
                </div>
            </div>
        </>
    );
}

export default NewtonRaphson;
