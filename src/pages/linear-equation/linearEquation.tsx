export function gauss_elimination(A: number[][]): number[] | null {
    const SIZE = A.length;
    const COL_SIZE = A[0].length;

    for (let i = 0; i < SIZE; i++) {
        const pivot_inv = 1.0 / A[i][i];

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
