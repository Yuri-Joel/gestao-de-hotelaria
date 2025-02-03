export function isNumber(param: any) {
    return !isNaN(parseFloat(param)) && isFinite(param);
}