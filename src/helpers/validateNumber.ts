/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNumber(param: any) {
    return !isNaN(parseFloat(param)) && isFinite(param);
}