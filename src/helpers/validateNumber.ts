export function isNumber(param: unknown): boolean {

    if (typeof param === 'string') {
        return !isNaN(parseFloat(param)) && isFinite(parseFloat(param));
    }
    return false;
}