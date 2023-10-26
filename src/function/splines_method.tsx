export class Spline {

    static linear_spline(X: number[], Y: number[], targetX: number): number | null {
        for (let i = 0; i < X.length - 1; i++) {
            console.log(X[i], targetX, X[i+1]);
            if (targetX >= X[i] && targetX <= X[i + 1]) {
                return Y[i] + (Y[i + 1] - Y[i]) / (X[i + 1] - X[i]) * (targetX - X[i]);
            }
        }
        return null;
    }
}