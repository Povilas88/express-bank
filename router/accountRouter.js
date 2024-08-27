import express from 'express';

export const accountRouter = express.Router();

const userData = [];

function isAlphabetic(str) {
    return [...str].every(char => isNaN(char));
}

function isValidBirthday(birthday) {
    if (birthday.length !== 10) {
        return false;
    }
    const parts = birthday.split('-');
    if (parts.length !== 3) {
        return false;
    }
    for (let part of parts) {
        if (isNaN(part) || part.length === 0) {
            return false;
        }
    }
    return true;
}

function getAge(DOB) {
    const today = new Date();
    const birthDateObj = new Date(DOB);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    return (monthDifference < 0 || (monthDifference === 0
        && today.getDate() < birthDateObj.getDate())) ? age - 1 : age;
}

accountRouter.post('/', (req, res) => {
    const { name, surname, birthDate } = req.body;

    if (userData.length === 0 && !name && !surname) {
        return res.json({ error: 'User data array is empty.' });
    }

    if (!name || !surname || !birthDate) {
        return res.json({ error: 'Name, surname and birth date are required.' });
    }

    if (!isAlphabetic(name) || !isAlphabetic(surname)) {
        return res.json({ error: 'Name and surname must contain only letters.' });
    }

    if (!isValidBirthday(birthDate)) {
        return res.json({ error: 'Invalid birthday format.' });
    }

    if (getAge(birthDate) < 18) {
        return res.json({ error: 'You must be at least 18 years old to open an account.' });
    }

    const isUnique = !userData.some(user => user.name === name && user.surname === surname);
    if (!isUnique) {
        return res.json({ error: 'Name and surname combination must be unique.' });
    }

    userData.push({ name, surname, birthDate });
    return res.json({ sucess: 'Account created successfully.' });
});

accountRouter.get('/:name-:surname', (req, res) => {
    const { name, surname, } = req.params;
    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.json({ error: 'User data array is empty.' });
    }

    if (user) {
        return res.json({
            success: `User real name: "${user.name} ${user.surname}", date of birth: ${user.birthDate}.`
        });
    } else {
        return res.json({ error: `User: "${name} ${surname}" not found.` });
    }
});

accountRouter.put('/:name-:surname', (req, res) => {
    const { name, surname } = req.params;
    const { newName, newSurname, newBirthDate } = req.body;

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userIndex === -1) {
        return res.json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!newName || !newSurname || !newBirthDate) {
        return res.json({ error: 'Name, surname, and birth date are required.' });
    }

    if (!isAlphabetic(newName) || !isAlphabetic(newSurname)) {
        return res.json({ error: 'Name and surname must contain only letters.' });
    }

    if (!isValidBirthday(newBirthDate)) {
        return res.json({ error: 'Invalid birthday format.' });
    }

    const isUnique = !userData.some((user, index) =>
        index !== userIndex && user.name === newName && user.surname === newSurname
    );

    if (!isUnique) {
        return res.json({ error: 'Name and surname combination must be unique.' });
    }

    userData[userIndex] = { name: newName, surname: newSurname, birthDate: newBirthDate };
    return res.json({ success: 'Account updated successfully.' });
});

accountRouter.get('/:name-:surname/name', (req, res) => {
    const { name, surname, } = req.params;
    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.json({ error: 'User data array is empty.' });
    }

    if (user) {
        return res.json({
            success: `User real name: "${user.name}".`
        });
    } else {
        return res.json({ error: `User: "${name} ${surname}" not found.` });
    }
});