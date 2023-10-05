import React, { useState } from 'react'
import * as math from 'mathjs'

const FixedPoint = () => {
    const { sqrt, pow, sin, cos, tan } = math;
    const [tolerance, setTolerance] = useState<number>(1e-6);
    const [fn, setFn] = useState('');
    const [x0, setX0] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    function fixedPointMethod(x0: number, fn: string): number {
        const f = math.compile(fn);
        let ea : number = 0, xrold: number;

        let xr = x0;
        do {
            xrold = xr;
            xr = f.evaluate({ x: xrold });
            if (xr != 0){
                ea = math.abs((xr - xrold) / xr) * 100;
            }
        } while (ea > tolerance);

        return xr;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFn(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const result = fixedPointMethod(x0, fn);
        console.log(result);
        setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    return (
        <>
            Fixed Point
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

export default FixedPoint;
