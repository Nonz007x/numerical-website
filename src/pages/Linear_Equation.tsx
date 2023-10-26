import { Box, TextField, Stack, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { LinearEquation } from "../function/linearEquation";
import { Util } from "../function/utils";

function Linear_Equation() {
  enum Method {
    Cramer = 'Cramer',
    Gauss = 'Gauss',
    Inversion = 'Matrix Inversion',
    LU = 'LU Decomposition',
    GaussSiedel = 'Gauss Siedel',
    Jacobi = 'Jacobi',
  }

  const [size, setSize] = useState<number>(3);
  const [A, setA] = useState<string[][]>(() => {
    return Array.from({ length: size }, () => new Array(size).fill(''));
  });
  const [B, setB] = useState<string[]>(() => new Array(size).fill(''));
  const [currentMethod, setCurrentMethod] = useState<string>(Method.Cramer);
  const [ans, setAns] = useState<number[]>();

  useEffect(() => {
    setA(() => Array.from({ length: size }, () => new Array(size).fill('')));
    setB(() => new Array(size).fill(''));
  }, [size]);

  const find_result = () => {
    const matrix1 = Util.strToNumArr2D(A);
    const matrix2 = Util.strToNumArr(B);
    const augmentedMat = Util.createAugmentedMatrix(matrix1, matrix2);
    switch (currentMethod) {
      case Method.Cramer:
        return LinearEquation.cramer(matrix1, matrix2);
      case Method.Gauss:
        return LinearEquation.gauss_elimination(augmentedMat);
      case Method.Inversion:
        return LinearEquation.matrixInversion(matrix1, matrix2);
      case Method.LU:
        return LinearEquation.luDecomposition(matrix1, matrix2);
      case Method.GaussSiedel:
        return LinearEquation.gaussSiedel(matrix1, matrix2);
      case Method.Jacobi:
        return LinearEquation.jacobi(matrix1, matrix2);
      default:
        break;
    }
  }

  const handleMatrixChange = (rowIndex: number, colIndex: number, newValue: string) => {
    setA((prevA) => {
      const newA = prevA.map((row, i) => {
        if (i === rowIndex) {
          return row.map((value, j) => (j === colIndex ? newValue : value));
        }
        return row;
      });
      return newA;
    });
  };

  const handleBChange = (colIndex: number, newValue: string) => {
    setB((prevB) => {
      const newB = prevB.map((value, i) => (i === colIndex ? newValue : value));
      return newB;
    });
  };

  const handleMethodChange = (e: SelectChangeEvent<string>) => {
    setCurrentMethod(e.target.value);
  }

  return (
    <>
      <div className="esan">
        <Stack spacing={1}>
          <h1 className="center">Linear Equation</h1>
          <Select
            variant="filled"
            value={currentMethod}
            label="Method"
            onChange={handleMethodChange}
          >
            <MenuItem value={Method.Cramer}>{Method.Cramer}</MenuItem>
            <MenuItem value={Method.Gauss}>{Method.Gauss}</MenuItem>
            <MenuItem value={Method.Inversion}>{Method.Inversion}</MenuItem>
            <MenuItem value={Method.LU}>{Method.LU}</MenuItem>
            <MenuItem value={Method.GaussSiedel}>{Method.GaussSiedel}</MenuItem>
            <MenuItem value={Method.Jacobi}>{Method.Jacobi}</MenuItem>
          </Select>
          <TextField
            variant="filled"
            label="Size m*m"
            type="number"
            value={size}
            onChange={(e) => {
              setSize(Math.max(Math.min(Number(e.target.value), 10), 2));
            }}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Matrix A:", A);
              console.log("Vector B:", B);
              const result = find_result();
              setAns(result === null || result === undefined ? [] : result);
            }}
          >
            <Box padding={"2em"} display={"flex"} justifyContent={"center"}>
              <Box className="A">
                <h3>A</h3>
                {A.map((row, rowIndex) => {
                  return (
                    <Box
                      key={rowIndex}
                      width="100%"
                      display="flex"
                      justifyContent="space-around"
                      gap="10px"
                    // gap="2em"
                    >
                      {row.map((_col, colIndex) => {
                        return (
                          <TextField
                            variant="filled"
                            type="number"
                            sx={{ maxWidth: 120 }}
                            key={`${rowIndex}-${colIndex}`}
                            value={A[rowIndex][colIndex]}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              handleMatrixChange(
                                rowIndex,
                                colIndex,
                                newValue
                              );
                            }}
                          />
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
              <Box minWidth={"1em"}></Box>
              <Box className="B" display={"flex"} flexDirection={"column"}>
                <h3>B</h3>
                {B.map((_value, colIndex) => {
                  return (
                    <TextField
                      variant="filled"
                      type="number"
                      sx={{ maxWidth: 120 }}
                      key={`${colIndex}`}
                      value={B[colIndex]}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        handleBChange(colIndex, newValue);
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <Stack spacing={2}>
            <h3>Answer</h3>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
              {ans?.map((value, index) => (
                <h4 key={index}>
                  x{index} = {value.toFixed(6)}
                </h4>
              ))}
            </Box>
          </Stack>
        </Stack>
      </div >
    </>
  );
}

export default Linear_Equation;