import { det } from "mathjs";
import { Util } from "./utils";

export class LinearEquation {
    static gauss_elimination(A: number[][]): number[] | null {
        const SIZE = A.length;
        const COL_SIZE = A[0].length;

        for (let i = 0; i < SIZE; i++) {
            let pivot = A[i][i];
            if (pivot === 0)
                pivot = 1e-9;
            console.log(pivot);
            const pivot_inv = 1.0 / pivot;

            for (let j = i; j < COL_SIZE; j++) {
                A[i][j] *= pivot_inv;
            }

            for (let j = 0; j < SIZE; j++) {
                if (j !== i) {
                    const factor = A[j][i];
                    for (let k = i; k < COL_SIZE; k++) {
                        A[j][k] -= factor * A[i][k];
                    }
                }
            }
        }

        const solutions = new Array(SIZE);
        for (let i = 0; i < SIZE; i++) {
            solutions[i] = A[i][COL_SIZE - 1];
        }

        return solutions;
    }

    static cramer(matrix: number[][], constants: number[]): number[] {
        const Rows = matrix.length;
        const DET_INV = 1 / det(matrix);
        const solutions: number[] = [];
    
        for (let i = 0; i < Rows; i++) {
            const matrixTemp: number[][] = [];
    
            for (let k = 0; k < Rows; k++) {
                matrixTemp.push(matrix[k].slice());
            }
    
            for (let j = 0; j < Rows; j++) {
                matrixTemp[j][i] = constants[j];
            }
    
            solutions.push(det(matrixTemp) * DET_INV);
        }
    
        return solutions;
    }
    
    static matrixInversion(matrixA: number[][], matrixB: number[]): number[] {
        const constantMatrix = Util.convertTo2DMatrix(matrixB);
        const Rows = matrixA.length;
        const matrix: number[][] = matrixA.map((row) => [...row]);
        const identityMatrix: number[][] = new Array(Rows).fill(null).map((_, i) =>
            new Array(Rows).fill(0).map((_, j) => (i === j ? 1 : 0))
        );
    
        // Gauss Elimination
        for (let i = 0; i < Rows; i++) {
            const pivot_inv = 1.0 / matrix[i][i];
    
            for (let j = 0; j < Rows; j++) {
                matrix[i][j] *= pivot_inv;
                identityMatrix[i][j] *= pivot_inv;
            }
    
            for (let j = 0; j < Rows; j++) {
                if (j !== i) {
                    const factor = matrix[j][i];
                    for (let k = 0; k < Rows; k++) {
                        identityMatrix[j][k] -= factor * identityMatrix[i][k];
                        matrix[j][k] -= factor * matrix[i][k];
                    }
                }
            }
        }
        const solutions = Util.matrixMultiplication(identityMatrix, constantMatrix);
        return solutions.flatMap((row) => row);
    }
    
    static luDecomposition(matrix: number[][], B: number[]): number[] {
        const constantMatrix = Util.convertTo2DMatrix(B);
        const Rows = matrix.length;
        const L: number[][] = new Array(Rows).fill(null).map((_, i) =>
            new Array(Rows).fill(0).map((_, j) => (i === j ? 1 : 0))
        );
        const U: number[][] = matrix.map((row) => [...row]);
    
        for (let i = 0; i < Rows; i++) {
            const pivot_inv = 1.0 / U[i][i];
    
            for (let j = i + 1; j < Rows; j++) {
                const factor = U[j][i];
                L[j][i] = factor * pivot_inv;
                for (let k = 0; k < Rows; k++) {
                    U[j][k] -= factor * pivot_inv * U[i][k];
                }
            }
        }
    
        // Forward substitution: LY = B
        for (let i = 1; i < Rows; i++) {
            for (let j = 0; j < i; j++) {
                constantMatrix[i][0] -= constantMatrix[j][0] * L[i][j];
            }
        }
    
        // Backward substitution: UY = X
        for (let i = Rows - 1; i >= 0; i--) {
            const factor_inv = 1 / U[i][i];
            constantMatrix[i][0] *= factor_inv;
    
            for (let j = i + 1; j < Rows; j++) {
                U[i][j] *= factor_inv;
                constantMatrix[i][0] -= constantMatrix[j][0] * U[i][j];
            }
        }
    
        return constantMatrix.flatMap((row) => row);
    }
    
    static gaussSiedel(A: number[][], B: number[]): number[] {
        const SIZE = A.length;
        const arrayNew: number[] = new Array(SIZE).fill(0.0);
    
        const tolerance = 1e-3;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const arrayPrev = [...arrayNew];
            let maxPercentageChange = 0.0;
    
            for (let row = 0; row < SIZE; row++) {
                let b = B[row];
                const diag = A[row][row];
    
                for (let col = 0; col < SIZE; col++) {
                    if (col !== row) {
                        b -= A[row][col] * arrayNew[col];
                    }
                }
    
                arrayNew[row] = b / diag;
    
                const percentageChange = Math.abs((arrayNew[row] - arrayPrev[row]) / arrayNew[row]) * 100;
                maxPercentageChange = Math.max(maxPercentageChange, percentageChange);
            }
    
            if (maxPercentageChange <= tolerance) {
                break;
            }
        }
    
        for (const value of arrayNew) {
            console.log(value + " ");
        }
    
        return arrayNew;
    }
    
    static jacobi(A: number[][], B: number[]): number[] {
        const SIZE = A.length;
        const arrayNew: number[] = new Array(SIZE).fill(0.0);
    
        const tolerance = 1e-3;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const arrayPrev = [...arrayNew];
            let maxPercentageChange = 0.0;
    
            for (let row = 0; row < SIZE; row++) {
                let b = B[row];
                const diag = A[row][row];
    
                for (let col = 0; col < SIZE; col++) {
                    if (col !== row) {
                        b -= A[row][col] * arrayPrev[col];
                    }
                }
    
                arrayNew[row] = b / diag;
    
                const percentageChange = Math.abs((arrayNew[row] - arrayPrev[row]) / arrayNew[row]) * 100;
                maxPercentageChange = Math.max(maxPercentageChange, percentageChange);
            }
    
            if (maxPercentageChange <= tolerance) {
                break;
            }
        }
    
        for (const value of arrayNew) {
            console.log(value + " ");
        }
    
        return arrayNew;
    }
}
