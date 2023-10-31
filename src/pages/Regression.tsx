import React, { useEffect, useState } from 'react';
import { Stack, Box, TextareaAutosize, Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { RegressionMethod, eqObj } from '../function/regression';

function Regression() {
  enum Method {
    Linear = 'linear',
    Polynomial = 'polynomial',
    Multiple = 'multiple'
  }

  const [currentMethod, setCurrentMethod] = useState<string>(Method.Linear);
  const [X, setX] = useState<number[][]>([[]]);
  const [Y, setY] = useState<number[]>([]);
  const [targetX, setTargetX] = useState<string>('');
  const [ans, setAns] = useState<string>('');
  const [eqAns, setEqAns] = useState<string>('');
  // const [ans, setAns] = useState<string>();
  const [predictorCount, setPredictorCount] = useState<number>(2);

  const handleXInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number): void => {
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
  };

  const handleYInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const input = e.target.value;
    const sanitizedInput = input
      .split(',')
      .map((item) => parseFloat(item.trim()))
      .filter((num) => !isNaN(num));

    setY(sanitizedInput);
  };

  const find_result = (): eqObj | null => {
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

  const handlePredictorInc = (): void => {
    setPredictorCount((prevCount) => {
      return prevCount = Math.min(prevCount + 1, 5);
    })
    setX((prevX) => {
      const newX = [...prevX];
      newX.push([]);
      return newX;
    });
  };

  const handlePredictorDec = (): void => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isEveryRowSameLength = X.map((row) => {
      return row.length === X[0].length;
    }).every(isSame => isSame);

    const isXSameLengthAsY = X.every(row => row.length === Y.length);

    if (!isEveryRowSameLength || !isXSameLengthAsY) {
      alert('Must provide same amount of data.');
      return;
    }

    const eqObj = find_result();
    const strAns = eqObj?.answer?.toFixed(6) ?? '';
    const arrEqAns = eqObj?.equation;


    switch (currentMethod) {
      case 'linear':
        setAns(strAns);
        setEqAns(`${arrEqAns[1].toFixed(6)}x ${arrEqAns[0].toFixed(6)}`);
        break;
      case 'polynomial':
        setAns(strAns);
        setEqAns(() => {
          let result = '';
          for (let i = arrEqAns?.length - 1; i > 0; i--) {
            result += `${arrEqAns[i].toFixed(6)}x^${i} + `;
          }
          result += `${arrEqAns[0]}`;
          return result
        });
        break;
      case 'multiple':
        console.log(arrEqAns);
        setEqAns(() => {
          let result = '';
          result += `${arrEqAns[0]} `
          for (let i = 1; i < arrEqAns?.length; i++) {
            result += `+ ${arrEqAns[i].toFixed(6)}x${i}`;
          }
          return result;
        });
        break;
    }
  }

  useEffect(() => {
    if (currentMethod !== Method.Multiple) {
      setX((prevX) => {
        const newX = [...prevX];
        if (newX.length > 1) {
          newX.splice(1);
        }
        return newX;
      });
    } else {
      setX((prevX) => {
        const newX = [...prevX];
        newX.push([]);
        return newX;
      });
    }
    setAns('');
    setEqAns('');
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
              <Button size='small' variant='outlined' color='error' onClick={handlePredictorDec}>Remove Predictor</Button> {/*decrement*/}

              <Button size='small' variant='outlined' color='success' onClick={handlePredictorInc}>Add Predictor</Button> {/*increment*/}
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
          <h4>
            {eqAns}
          </h4>
        </Box>
      </Stack>
    </div>
  );
}

export default Regression;
