export function isValidString(str, type) {
    const stringMinSize = 2;
    const stringMaxSize = 20;
    const stringAllowedABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (typeof str !== 'string') {
        return 'Input must be a string';
    } else if (str.length < stringMinSize) {
        return `${type} is too short, must be at least ${stringMinSize} characters`;
    } else if (str.length > stringMaxSize) {
        return `${type} is too long, cannot exceed ${stringMaxSize} characters`;
    } else if (str[0] !== str[0].toUpperCase()) {
        return `${type} must start with an uppercase letter`;
    } else {
        for (let char of str) {
            if (!stringAllowedABC.includes(char)) {
                return `Invalid character found in ${type}`;
            }
        }
    }

    return '';
}

export function isValidBirthday(birthday) {
    const [year, month, day] = birthday.split('-').map(Number);

    if (!year || !month || !day
        || birthday.length !== 10
        || year < 1900 || year > new Date().getFullYear()
        || month < 1 || month > 12) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    return day > 0 && day <= daysInMonth;
}

export function isValidRequest(body) {
    return typeof body === 'object'
        && body !== null
        && !Array.isArray(body)
        && Object.keys(body).length === 4;
}

export function getAge(DOB) {
    const today = new Date();
    const birthDateObj = new Date(DOB);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    return (monthDifference < 0 || (monthDifference === 0
        && today.getDate() < birthDateObj.getDate())) ? age - 1 : age;
}
