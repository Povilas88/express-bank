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
    } else if (str.slice(1) !== str.slice(1).toLowerCase()) {
        return `${type} must have all lowercase letters after the first character`;
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
    const allowedSymbol = '-0123456789';

    if (birthday.length !== 10) {
        return false;
    }

    for (let symbol of birthday) {
        if (!allowedSymbol.includes(symbol)) {
            return false;
        }
    }

    if (birthday[4] !== '-' || birthday[7] !== '-') {
        return false;
    }

    const year = Number(birthday.slice(0, 4));
    const month = Number(birthday.slice(5, 7));
    const day = Number(birthday.slice(8, 10));

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
    }

    function isLeapYear(year) {
        return (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0);
    }

    if (!isLeapYear(year) && month === 2 && day === 29) {
        return false;
    }

    if (year < 1900 || year > new Date().getFullYear() || month < 1 || month > 12) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    return day > 0 && day <= daysInMonth;
}

export function isValidRequest(body) {
    return typeof body === 'object'
        && body !== null
        && !Array.isArray(body)
        && Object.keys(body).length <= 4
}

export function getAge(DOB) {
    if (!isValidBirthday(DOB)) {
        return false;
    }

    const birthDateObj = new Date(DOB);
    const today = new Date();

    if (birthDateObj > today) {
        return false;
    }

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
}