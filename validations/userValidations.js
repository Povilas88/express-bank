export function isAlphabetic(str) {
    return [...str].every(char => isNaN(char));
}

export function isValidBirthday(birthday) {
    if (birthday.length !== 10) return false;
    const parts = birthday.split('-');
    if (parts.length !== 3) return false;
    return parts.every(part => !isNaN(part) && part.length > 0);
}

export function getAge(DOB) {
    const today = new Date();
    const birthDateObj = new Date(DOB);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    return (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) ? age - 1 : age;
}
