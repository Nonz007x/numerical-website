import React, { useEffect, useState } from 'react';
import { Stack, Box, TextareaAutosize, Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';

function Regression() {
    enum Method {
        Linear = 'linear',
        Polynomial = 'polynomial',
        Multiple = 'multiple'
    }

    const [currentMethod, setCurrentMethod] = useState<string>('');
    const [X, setX] = useState<number[]>([]);
    const [Y, setY] = useState<number[]>([]);
    const [targetX, setTargetX] = useState<string>('');
    const [ans, setAns] = useState<string>();
    const [predictorCount, setPredictorCount] = useState<number>(1);

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

    }

    useEffect(() => {

    }, [currentMethod]);

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
                            {currentMethod === Method.Multiple ?
                                Array.from({ length: predictorCount }).map(() => (
                                    <TextareaAutosize aria-label="X" minRows={10} placeholder="Example: 3,5,6" onChange={(e) => handleXInputChange(e)} />
                                ))
                                : null
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
                            <Button variant='contained' color='error' onClick={() => {
                                setPredictorCount((prevCount) => {
                                    return prevCount = Math.max(prevCount - 1, 1);
                                }
                                )
                            }}>-</Button> {/*decrement*/}

                            <Button variant='contained' color='success' onClick={() => {
                                setPredictorCount((prevCount) => {
                                    return prevCount = Math.min(prevCount + 1, 5);
                                }
                                )
                            }}>+</Button> {/*increment*/}
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
