import express from 'express';

export const accountRouter = express.Router();

const userData = [];

accountRouter.get('/account', (req, res) => {
    console.log(userData);
    return res.send('account page');
});

accountRouter.post('/account', (req, res) => {
    const { name, surname, birthDate } = req.body;

    if (userData.length === 0 && !name && !surname) {
        return res.send('Error: User data array is empty.');
    }

    if (!name || !surname || !birthDate) {
        return res.send('Error: Name, surname and birth date are required.');
    }

    function isAlphabetic(str) {
        return [...str].every(char => isNaN(char));
    }

    if (!isAlphabetic(name) || !isAlphabetic(surname)) {
        return res.send('Error: Name and surname must contain only letters.');
    }

    function isValidBirthday(birthday) {
        if (birthday.length !== 10) return false;

        const parts = birthday.split('-');
        if (parts.length !== 3) return false;

        for (let part of parts) {
            if (isNaN(part) || part.length === 0) return false;
        }

        return true;
    }

    if (!isValidBirthday(birthDate)) {
        return res.send('Error: Invalid birthday format.');
    }

    function getAge(DOB) {
        const today = new Date();
        const birthDateObj = new Date(DOB);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = today.getMonth() - birthDateObj.getMonth();

        return (monthDifference < 0 || (monthDifference === 0
            && today.getDate() < birthDateObj.getDate())) ? age - 1 : age;
    }

    if (getAge(birthDate) < 18) {
        return res.send('You must be at least 18 years old to open an account.');
    }

    const isUnique = !userData.some(user => user.name === name && user.surname === surname);
    if (!isUnique) {
        return res.send('Name and surname combination must be unique.');
    }

    userData.push({ name, surname, birthDate });
    return res.send('Account created successfully.');
});