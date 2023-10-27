import React, { useState } from 'react';
import { Stack, Box, TextareaAutosize, Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { RegressionMethod } from '../function/regression';

function Regression() {
    enum Method {
        Linear = 'linear',
        Polynomial = 'polynomial',
        Multiple = 'multiple'
    }

    const [currentMethod, setCurrentMethod] = useState<string>('');
    const [X, setX] = useState<number[][]>([[], []]);
    const [Y, setY] = useState<number[]>([]);
    const [targetX, setTargetX] = useState<string>('');
    const [ans, setAns] = useState<string>();
    // const [ans, setAns] = useState<string>();
    const [predictorCount, setPredictorCount] = useState<number>(2);

    const handleXInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const input = e.target.value;
        const sanitizedInput = input
            .split(',')
            .map((item) => parseFloat(item.trim()))
            .filter((num) => !isNaN(num));
        setX((prevArr) => {
            const newArr = prevArr.map((row, i) => {
                if (i === index) {
                    return sanitizedInput;
                    // return row.map((value, j) => (j === colIndex ? newValue : value));
                }
                return row;
            });
            return newArr;
        });
        console.log(index)
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
        console.log(X);
        const numTargetX = Number(targetX);
        switch (currentMethod) {
            case 'linear':
                return RegressionMethod.linear_regression(X[0], Y, numTargetX);
            case 'polynomial':
                return RegressionMethod.polynomial_regression(X[0], Y, 2, numTargetX);
            case 'multiple':
                return RegressionMethod.multiple_linear_regression(X, Y);
            default:
              return null;
        }
    }

    const handlePredictorInc = () => {
        setPredictorCount((prevCount) => {
            return prevCount = Math.min(prevCount + 1, 5);
        })
        setX((prevX) => {
            const newX = [...prevX];
            newX.push([]);
            return newX;
        });
    };

    const handlePredictorDec = () => {
        setPredictorCount((prevCount) => {
            return prevCount = Math.max(prevCount - 1, 2);
        })
        setX((prevX) => {
            if (prevX.length === 2) {
                return prevX;
            }
            const newX = [...prevX];
            newX.pop();
            return newX;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // switch (currentMethod) {
          // case 'linear':
              
          // case 'polynomial':
              
          // case 'multiple':

      // }
        // const result = find_result()?.toString();
        // setAns(result === null || result === undefined ? '' : result);
    }

    return (
        <div className="esan">
            <Stack spacing={1}>
                <h1 className="center">Least Square Regression</h1>
                <Box display={'flex'} justifyContent={'center'}>
                    <Stack>
                        <InputLabel>Select Method</InputLabel>
                        <Select
                            style={{ maxWidth: '600px', minWidth: '500px' }}
                            size='small'
                            variant="outlined"
                            value={currentMethod}
                            label="Method"
                            onChange={e => setCurrentMethod(e.target.value)}
                        >
                            <MenuItem value={Method.Linear}>{Method.Linear}</MenuItem>
                            <MenuItem value={Method.Polynomial}>{Method.Polynomial}</MenuItem>
                            <MenuItem value={Method.Multiple}>{Method.Multiple}</MenuItem>
                        </Select>
                    </Stack>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box padding={"2em"} display={"flex"} justifyContent={"center"}>
                        <Box>
                            {currentMethod !== Method.Multiple ?
                                <>
                                    <h3 className='center'>X</h3>
                                    <TextareaAutosize key={`${0}`} aria-label="X" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleXInputChange(e, 0)} />
                                </>
                                :
                                <Box display={'flex'} gap={'10px'}>
                                    {Array.from({ length: predictorCount }).map((_, index) => (
                                        <Stack>
                                            <h3 className='center'>X{index + 1}</h3>
                                            <TextareaAutosize key={`X${index}`} aria-label="X" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleXInputChange(e, index)} />
                                        </Stack>
                                    ))}
                                </Box>
                            }
                        </Box>
                        <Box minWidth={"1em"}></Box>
                        <Box>
                            <h3 className='center'>Y</h3>
                            <TextareaAutosize aria-label="Y" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleYInputChange(e)} />
                        </Box>
                    </Box >
                    {currentMethod === Method.Multiple ?
                        <div className="submitButton">
                            <Button variant='contained' color='error' onClick={handlePredictorDec}>-</Button> {/*decrement*/}

                            <Button variant='contained' color='success' onClick={handlePredictorInc}>+</Button> {/*increment*/}
                        </div>
                        : null
                    }
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

export default Regression;
