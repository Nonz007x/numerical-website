import React, { useState } from 'react'
import * as math from 'mathjs'

const FalsePosition = () => {
    const { sqrt, pow, sin, cos, tan } = math;
    const [tolerance, setTolerance] = useState<number>(1e-6);
    const [fn, setFn] = useState('');
    const [xl, setXl] = useState<number>(0);
    const [xu, setXu] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    function falsePositionMethod(xl: number, xu: number, fn: string): number {
        
        const f = math.compile(fn);

        const fl: number = f.evaluate({ x: xl });
        const fu: number = f.evaluate({ x: xu });
        
        let xrold: number, fr: number, test: number;
        let xr = 0;

        do {
            xrold = xr;
            xr = xu - fu * (xl - xu) / (fl - fu);
            fr = f.evaluate({ x: xr });

            if (xr !== 0) {
                const ea: number = Math.abs((xr - xrold) / xr) * 100;
                if (ea < tolerance) {
                    return xr; // Converged
                }
            }

            test = fl * fr;
            if (test < 0) {
                xu = xr;
            } else if (test > 0) {
                xl = xr;
            } else {
                return xr; // Exact root found
            }
        } while (true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFn(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const result = falsePositionMethod(xl, xu, fn);
        console.log(result);
        setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    return (
        <>
            False Position
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTolerance(Number(e.target.value))} placeholder="Tolerance" />
                <input type="text" onChange={(e) => setXl(Number(e.target.value))} placeholder="xl" />
                <input type="text" onChange={(e) => setXu(Number(e.target.value))} placeholder="xu" />
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

export default FalsePosition;
