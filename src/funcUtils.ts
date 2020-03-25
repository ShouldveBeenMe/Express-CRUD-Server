// export function countElemsArray(arr) {
//     return arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
// }

export function checkIfDuplicateExists(arr: string[]): boolean {
    return new Set(arr).size !== arr.length;
}
