import React, { useEffect } from 'react'
import { gauss_elimination } from './linearEquation'
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

function Gaussian_elimination() {
  const [size, setSize] = useState<number>(2);
  const [matrixValues, setMatrixValues] = useState<number[][]>([[]]);
  const [displayMatrix, setDisplayMatrix] = useState<JSX.Element[]>([]);

  const initializeMatrix = () => {
    console.log("initializing...");
    setMatrixValues(() => {
      const initialArray: number[][] = new Array(size);

      for (let i = 0; i < size; i++) {
        initialArray[i] = new Array(size + 1).fill(0);
      }
      return initialArray;
    });
    console.log(matrixValues);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [row, col] = name.split('-');

    setMatrixValues((oldMatrix: number[][]) => {
      const newValues = [...oldMatrix.map(row => [...row])];
      newValues[parseInt(row)][parseInt(col)] = Number(value);
      return newValues;
    });
  };

  const handleDropdown = (e: SelectChangeEvent<number>) => {
    e.preventDefault();
    setSize(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(matrixValues);
    const result = gauss_elimination(matrixValues);
    const formattedResult: number[] | undefined = result?.map((num) => parseFloat(num.toFixed(6)));
    console.log(formattedResult);
  };

  const generateMatrix = () => {
    console.log("generating...");
    const matrix = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size + 1; j++) {
        row.push(
          <TextField
            key={`${i}-${j}`}
            name={`${i}-${j}`}
            variant="filled"
            value={matrixValues[i] == undefined? 9999: matrixValues[i][j]}
            onChange={handleInput}
          />
        );
      }
      matrix.push(
        <div key={i} style={{ display: 'flex' }} className='matrixRow'>
          {row}
        </div>
      );
    }
    setDisplayMatrix(matrix);
  };

  useEffect(() => {
    initializeMatrix();
  }, [size]);
  
  useEffect(() => {
    generateMatrix();
  }, [size]);

  const handleClear = (): void => {
    setMatrixValues(() => {
      const newMatrix: number[][] = new Array(size);
      for (let i = 0; i < size; i++) {
        newMatrix[i] = new Array(size + 1).fill(0);
      }
      return newMatrix;
    });
    console.log(matrixValues);
  };

  return (
    <>
      <div className="esan">
        <form onSubmit={handleSubmit} className="form-padding">
          <h1 className='center'>Gaussian Elimination</h1>
          <InputLabel>Size</InputLabel>
          <Select
            value={size}
            label="Size"
            onChange={handleDropdown}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
          </Select>
          <div className='matrixContainer'>
            {displayMatrix}
          </div>
          <div className="submitButton">
            <Button type="submit" variant='contained' color='success'>submit</Button>
            <Button variant='contained' onClick={handleClear} color='error'>clear</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Gaussian_elimination