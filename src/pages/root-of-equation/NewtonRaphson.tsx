import React, { useState } from 'react'
import * as math from 'mathjs'

const NewtonRaphson = () => {
    const { sqrt, pow, sin, cos, tan } = math;
    const [tolerance, setTolerance] = useState<number>(1e-6);
    const [fn, setFn] = useState('');
    const [x0, setX0] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    function newtonRaphsonMethod(x0: number, fn: string) {
        const MAX_ITER = 1000;
        const f = math.compile(fn);

        let x: number = x0;
        let i : number = 0;
        while (true) {
            i++;
            const fx = f.evaluate({ x: x });
            console.log()
            const diff_fx = math.derivative(fn, 'x');
            const xold: number = x;
            x = x - (fx / diff_fx.evaluate({x : x}));
            if (math.abs(xold - x) < tolerance || i >= MAX_ITER) {
                break;
            }
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
        console.log(result);
        setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    return (
        <>
            <h1>Newton Raphson</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTolerance(Number(e.target.value))} placeholder="Tolerance" />
                <input type="text" onChange={(e) => setX0(Number(e.target.value))} placeholder="x0" />
                <input type="text" onChange={handleChange} value={fn} placeholder="Function" />
                <button type="submit">Submit</button>
            </form>
            {tolerance} <br />
            {x0}
            <div>
                Result: {result !== null ? result : "Invalid Expression"}
            </div>
        </>
    );
}

export default NewtonRaphson;
