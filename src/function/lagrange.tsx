export class LangrangeInterpolation {

  lagrangePolynomial(targetX: number, X: number[], Y: number[]): number {
    const n: number = X.length;
    let result: number = 0;

    for (let i: number = 0; i < n; i++) {
      let term: number = Y[i];
      for (let j: number = 0; j < n; j++) {
        if (i !== j) {
          term *= (targetX - X[j]) / (X[i] - X[j]);
        }
      }
      console.log();
      result += term;
    }

    return result;
  }

  lagrangeLinear(targetX: number, X: number[], Y: number[]): number {
    const n: number = X.length;
    let result: number = 0;

    let term: number = Y[0];
    term *= (targetX - X[n - 1]) / (X[0] - X[n - 1]);
    result += term;

    term = Y[n - 1];
    term *= (targetX - X[0]) / (X[n - 1] - X[0]);
    result += term;

    return result;
  }

  lagrangeQuadratic(targetX: number, X: number[], Y: number[]): number {
    const n: number = X.length;
    let result: number = 0;

    for (let i = 0; i < n; i += 2) {
      let term: number = Y[i];
      for (let j = 0; j < n; j += 2) {
        if (i !== j) {
          term *= (targetX - X[j]) / (X[i] - X[j]);
        }
      }
      result += term;
    }

    return result;
  }
}
