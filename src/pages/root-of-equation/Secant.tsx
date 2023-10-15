import React, { useState } from 'react'
import * as math from 'mathjs'

const Secant = () => {
    const { sqrt, pow, sin, cos, tan } = math;
    const [tolerance, setTolerance] = useState<number>(1e-6);
    const [fn, setFn] = useState('');
    const [x0, setX0] = useState<number>(0);
    const [x1, setX1] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);

    function secentMethod(x0: number, x1: number, equation: string) {
        const f = math.compile(equation);

        let previousX: number;
        let xi = x0;

        do {
            previousX = xi;
            xi = x0 - (f.evaluate({ x: x0 }) * (x0 - x1)) / (f.evaluate({ x: x0 }) - f.evaluate({ x: x1 }));
            x0 = x1;
            x1 = xi;
        } while (Math.abs((xi - previousX) / xi) * 100 > 0.000001);
        return xi;
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFn(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const result = secentMethod(x0, x1, fn);
        setResult(result !== null ? result.toFixed(-Math.log10(tolerance)) : "Invalid Expression");
    };

    return (
        <>
            <h1>Secant</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTolerance(Number(e.target.value))} placeholder="Tolerance" />
                <input type="text" onChange={(e) => setX0(Number(e.target.value))} placeholder="x0" />
                <input type="text" onChange={(e) => setX1(Number(e.target.value))} placeholder="x1" />
                <input type="text" onChange={handleChange} value={fn} placeholder="Function" />
                <button type="submit">Submit</button>
            </form>
            {tolerance} <br />
            {x0}
            {x1}
            <div>
                Result: {result !== null ? result : "Invalid Expression"}
            </div>
        </>
    );
}

export default Secant;
