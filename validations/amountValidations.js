export function validateAmount(amount) {
    if (typeof amount !== 'number' ||
        amount <= 0 ||
        amount > 1000000 ||
        isNaN(amount) ||
        !isFinite(amount) ||
        amount === null) {
        return false;
    }
    return true;
}