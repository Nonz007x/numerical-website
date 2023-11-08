export enum Method {
  ROOT_OF_EQUATION = 'rootOfEquation',
  LINEAR_EQUATION = 'linearEquation',
  REGRESSION = 'regression',
  SPLINES = 'splines',
}

export type Point = {
  x: number,
  y: number
}

export class Util {
    static strToNumArr2D(stringArray: string[][]): number[][] {
        const numberArray: number[][] = [];

        for (let i = 0; i < stringArray.length; i++) {
            const row: number[] = [];
            for (let j = 0; j < stringArray[i].length; j++) {

                const num = parseFloat(stringArray[i][j]);

                if (!isNaN(num)) {
                    row.push(num);
                }
            }
            numberArray.push(row);
        }

        return numberArray;
    }
    static strToNumArr(stringArray: string[]): number[] {
        const numberArray: number[] = [];

        for (let i = 0; i < stringArray.length; i++) {
            const num = parseFloat(stringArray[i]);

            if (!isNaN(num)) {
                numberArray.push(num);
            }
        }

        return numberArray;
    }

    static createAugmentedMatrix(coeffMatrix: number[][], rightHandSide: number[]): number[][] {
        if (coeffMatrix.length !== rightHandSide.length) {
            throw new Error("Matrix dimensions are not compatible.");
        }

        const augmentedMatrix = coeffMatrix.map((row, index) => {
            return [...row, rightHandSide[index]];
        });

        return augmentedMatrix;
    }

    static convertTo2DMatrix(inputArray: number[]): number[][] {
        return inputArray.map((element) => [element]);
    }

    static matrixMultiplication(matrixA: number[][], matrixB: number[][]): number[][] {
        const Rows = matrixA.length;
        const Cols = matrixB[0].length;
        const resultMatrix: number[][] = new Array(Rows).fill(null).map(() => new Array(Cols).fill(0));
    
        for (let i = 0; i < Rows; i++) {
            for (let j = 0; j < Cols; j++) {
                for (let k = 0; k < Rows; k++) {
                    resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
    
        return resultMatrix;
    }
}