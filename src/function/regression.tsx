import { LinearEquation } from "./linearEquation";
import { Util } from "./utils";

export class Regression {
    linear_regression(X: number[], Y: number[], targetX: number): number | null {
        const n: number = X.length;
        let [sumY, sumX, sumXY, sumXX] = [0, 0, 0, 0];

        for (let i = 0; i < n; i++) {
            sumX += X[i];
            sumY += Y[i];
            sumXY += X[i] * Y[i];
            sumXX += X[i] ** 2;
        }

        const coefficientMatrix = [[n, sumX], [sumX, sumXX]];
        const constantMatrix = [sumY, sumXY];

        const coefficients = LinearEquation.gauss_elimination(Util.createAugmentedMatrix(coefficientMatrix, constantMatrix));
        if (coefficients === null) {
            console.error("Error: Unable to calculate coefficients.");
            return null;
        }

        return coefficients[0] + coefficients[1] * targetX;
    }

    // order 0 to m
    polynomial_regression(X: number[], Y: number[], order: number, targetX: number): number | null {
        if (order === 1)
            return this.linear_regression(X, Y, targetX);


        order = order + 1;
        const n: number = X.length;

        if (order > n) {
            console.log("The order cannot be larger than the number of data points.")
            return -1;
        }

        // Initialize coefficientMatrix and constantMatrix
        const coefficientMatrix: number[][] = [];
        const constantMatrix: number[] = [];
        for (let rowIndex = 0; rowIndex < order; rowIndex++) {
            coefficientMatrix.push(new Array(order).fill(0));
            constantMatrix.push(0);
        }

        // coefficientMatrix
        for (let i = 0; i < order; i++) {
            for (let j = 0; j < order; j++) {
                let sumX = 0;
                for (let k = 0; k < n; k++) {
                    sumX += X[k] ** (i + j);
                }
                coefficientMatrix[i][j] = sumX;
            }
        }

        // constantMatrix
        for (let i = 0; i < order; i++) {
            let sumYX = 0;
            for (let j = 0; j < n; j++) {
                sumYX += Y[j] * X[j] ** i;
            }
            constantMatrix[i] = sumYX;
        }

        const coefficients = LinearEquation.gauss_elimination(Util.createAugmentedMatrix(coefficientMatrix, constantMatrix));
        let result = 0;

        if (coefficients === null) {

            console.error("Error: Unable to calculate coefficients.");
            return null;
        } else {
            for (let i = 0; i < order; i++) {
                result += coefficients[i] * targetX ** i;
            }
        }

        return result;
    }

    multiple_linear_regression(X: number[][], Y: number[]): number[] | null {
        const order = X.length + 1;
        const n = X[0].length;

        const coefficientMatrix: number[][] = [];
        const constantMatrix: number[] = [];
        for (let rowIndex = 0; rowIndex < order; rowIndex++) {
            coefficientMatrix.push(new Array(order).fill(0));
            constantMatrix.push(0);
        }

        coefficientMatrix[0][0] = n;

        for (let i = 1; i < order; i++) {
            let sumX = 0;
            for (let j = 0; j < n; j++) {
                sumX += X[i - 1][j];
            }
            coefficientMatrix[0][i] = sumX;
        }

        // coefficientMatrix
        for (let i = 1; i < order; i++) {
            for (let j = 0; j < order; j++) {
                let sumX = 0;
                for (let k = 0; k < n; k++) {
                    if (j === 0) {
                        sumX += X[i - 1][k];
                    } else {
                        sumX += X[j - 1][k] * X[i - 1][k];
                    }
                }
                coefficientMatrix[i][j] = sumX;
            }
        }

        //constantMatrix 
        for (let i = 0; i < order; i++) {
            let sumXY = 0;
            for (let j = 0; j < n; j++) {
                if (i === 0) {
                    sumXY += Y[j];
                } else {
                    sumXY += Y[j] * X[i - 1][j];
                }
            }
            constantMatrix[i] = sumXY;
        }

        const coefficients = LinearEquation.gauss_elimination(Util.createAugmentedMatrix(coefficientMatrix, constantMatrix));
        if (coefficients === null) {
            console.error("Error: Unable to calculate coefficients.");
            return null;
        }
        return coefficients;
    }
}