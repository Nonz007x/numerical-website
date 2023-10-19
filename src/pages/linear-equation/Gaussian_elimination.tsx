import { Box, TextField, Stack, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { gauss_elimination, createAugmentedMatrix, cramer, matrixInversion, luDecomposition } from "./linearEquation";

function Gaussian_elimination() {
  enum Methods {
    Cramer = 'Cramer',
    Gauss = 'Gauss',
    Inversion = 'Matrix Inversion',
    LU = 'LU Decomposition'
  }
  const [size, setSize] = useState<number>(3);
  const [A, setA] = useState<number[][]>(() => {
    return Array.from({ length: size }, () => new Array(size).fill(0));
  });
  const [B, setB] = useState<number[]>(() => new Array(size).fill(0));
  const [currentMethod, setCurrentMethod] = useState<string>('');
  const [ans, setAns] = useState<number[]>();

  useEffect(() => {
    setA(() => Array.from({ length: size }, () => new Array(size).fill(0)));
    setB(() => new Array(size).fill(0));
  }, [size]);

  const find_result = () => {
    const augmentedMat = createAugmentedMatrix(A, B);
    switch (currentMethod) {
      case Methods.Cramer:
        return cramer(A, B);
      case Methods.Gauss:
        return gauss_elimination(augmentedMat);
      case Methods.Inversion:
        return matrixInversion(A, B);
        case Methods.LU:
          return luDecomposition(A, B);
      default:
        break;
    }
  }

  const handleMatrixChange = (rowIndex: number, colIndex: number, newValue: number) => {
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

  const handleBChange = (colIndex: number, newValue: number) => {
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
          <h1 className="center">Gaussian Elimination</h1>
          <Select
            value={currentMethod}
            label="Method"
            onChange={handleMethodChange}
          >
            <MenuItem value={Methods.Cramer}>{Methods.Cramer}</MenuItem>
            <MenuItem value={Methods.Gauss}>{Methods.Gauss}</MenuItem>
            <MenuItem value={Methods.Inversion}>{Methods.Inversion}</MenuItem>
            <MenuItem value={Methods.LU}>{Methods.LU}</MenuItem>
          </Select>
          <TextField
            variant="outlined"
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
                    // gap="2em"
                    >
                      {row.map((col, colIndex) => {
                        return (
                          <TextField
                            type="number"
                            sx={{ maxWidth: 120 }}
                            key={`${rowIndex}-${colIndex}`}
                            value={A[rowIndex][colIndex]}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
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
                {B.map((value, colIndex) => {
                  return (
                    <TextField
                      type="number"
                      sx={{ maxWidth: 120 }}
                      key={`${colIndex}`}
                      value={B[colIndex]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
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

export default Gaussian_elimination;