import { det } from "mathjs";
type Matrix = number[][];

export function createAugmentedMatrix(coeffMatrix: Matrix, rightHandSide: number[]): Matrix {
    if (coeffMatrix.length !== rightHandSide.length) {
        throw new Error("Matrix dimensions are not compatible.");
    }

    const augmentedMatrix = coeffMatrix.map((row, index) => {
        return [...row, rightHandSide[index]];
    });

    return augmentedMatrix;
}

function convertTo2DMatrix(inputArray: number[]): Matrix {
    return inputArray.map((element) => [element]);
}

export function gauss_elimination(A: Matrix): number[] | null {
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

export function cramer(matrix: Matrix, constants: number[]): number[] {
    const Rows = matrix.length;
    const DET_INV = 1 / det(matrix);
    const solutions: number[] = [];

    for (let i = 0; i < Rows; i++) {
        const matrixTemp: Matrix = [];

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


function matrixMultiplication(matrixA: Matrix, matrixB: Matrix): Matrix {
    const Rows = matrixA.length;
    const Cols = matrixB[0].length;
    const resultMatrix: Matrix = new Array(Rows).fill(null).map(() => new Array(Cols).fill(0));

    for (let i = 0; i < Rows; i++) {
        for (let j = 0; j < Cols; j++) {
            for (let k = 0; k < Rows; k++) {
                resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return resultMatrix;
}

export function matrixInversion(matrixA: Matrix, matrixB: number[]): number[] {
    const constantMatrix = convertTo2DMatrix(matrixB);
    const Rows = matrixA.length;
    const matrix: Matrix = matrixA.map((row) => [...row]);
    const identityMatrix: Matrix = new Array(Rows).fill(null).map((_, i) =>
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
    const solutions = matrixMultiplication(identityMatrix, constantMatrix);
    return solutions.flatMap((row) => row);
}

export function luDecomposition(matrix: Matrix, B: number[]): number[] {
    const constantMatrix = convertTo2DMatrix(B);
    const Rows = matrix.length;
    const L: Matrix = new Array(Rows).fill(null).map((_, i) =>
        new Array(Rows).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    const U: Matrix = matrix.map((row) => [...row]);

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
            constantMatrix[i][0] -=  constantMatrix[j][0] * U[i][j];
        }
    }

    return constantMatrix.flatMap((row) => row);
}