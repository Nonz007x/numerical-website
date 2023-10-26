import React, { useState } from 'react';
import { Stack, Box, TextareaAutosize, Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { Spline } from '../function/splines_method';

function Splines() {
    enum Method {
        Linear = 'linear',
        Quadratic = 'quadratic',
        Cubic = 'cubic'
    }

    const [currentMethod, setCurrentMethod] = useState<string>(Method.Linear);
    const [X, setX] = useState<number[]>([]);
    const [Y, setY] = useState<number[]>([]);
    const [targetX, setTargetX] = useState<string>('');
    const [ans, setAns] = useState<string>();

    const handleXInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const sanitizedInput = input
            .split(',')
            .map((item) => parseFloat(item.trim()))
            .filter((num) => !isNaN(num));

        setX(sanitizedInput);
    };

    const handleYInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const sanitizedInput = input
            .split(',')
            .map((item) => parseFloat(item.trim()))
            .filter((num) => !isNaN(num));

        setY(sanitizedInput);
    };

    const find_result = () => {
        const numTargetX = Number(targetX);
        switch (currentMethod) {
            case 'linear':
                return Spline.linear_spline(X, Y, numTargetX);
            case 'quadratic':
                return null;
            case 'cubic':
                return null;
            default:
                return null;
        }
    }

    return (
        <div className="esan">
            <Stack spacing={1}>
                <h1 className="center">Splines</h1>
                <InputLabel >Select Method</InputLabel>
                <Select
                    size='small'
                    variant="outlined"
                    value={currentMethod}
                    label="Method"
                    onChange={e => setCurrentMethod(e.target.value)}
                >
                    <MenuItem value={Method.Linear}>{Method.Linear}</MenuItem>
                    <MenuItem value={Method.Quadratic}>{Method.Quadratic}</MenuItem>
                    <MenuItem value={Method.Cubic}>{Method.Cubic}</MenuItem>
                </Select>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const result = find_result()?.toString();
                        setAns(result === null || result === undefined ? '' : result);
                    }}
                >
                    <Box padding={"2em"} display={"flex"} justifyContent={"center"}>
                        <Box>
                            <h3 className='center'>X</h3>
                            <TextareaAutosize aria-label="X" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleXInputChange(e)} />
                        </Box>
                        <Box minWidth={"1em"}></Box>
                        <Box>
                            <h3 className='center'>Y</h3>
                            <TextareaAutosize aria-label="Y" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleYInputChange(e)} />
                        </Box>
                    </Box>
                    <Box padding={"2em"} display={"flex"} justifyContent={"center"}>
                        <Stack>
                            <TextField label='Target X' size='small' variant="outlined" sx={{ maxWidth: 500 }} value={targetX} onChange={e => setTargetX(e.target.value)} />
                        </Stack>
                    </Box>
                    <div className="submitButton">
                        <Button type="submit" variant='contained' color='success'>submit</Button>
                    </div>
                </form>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <h4>
                        {ans}
                    </h4>
                </Box>
            </Stack>
        </div>
    );
}

export default Splines;
