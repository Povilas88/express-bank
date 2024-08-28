import express from 'express';
import userData from '../../data/userData.js'
import { isAlphabetic, isValidBirthday, getAge } from '../../validations/userValidations.js';
import { dobRouter } from './dobRouter.js';
import { nameRouter } from './nameRouter.js';
import { surnameRouter } from './surnameRouter.js';
export const accountRouter = express.Router();

accountRouter.use('/', dobRouter);
accountRouter.use('/', nameRouter);
accountRouter.use('/', surnameRouter);

accountRouter.post('/', (req, res) => {
    const { name, surname, birthDate } = req.body;

    if (userData.length === 0 && !name && !surname) {
        return res.status(400).json({ error: 'User data array is empty.' });
    }

    if (!name || !surname || !birthDate) {
        return res.status(400).json({ error: 'Name, surname and birth date are required.' });
    }

    if (!isAlphabetic(name) || !isAlphabetic(surname)) {
        return res.status(400).json({ error: 'Name and surname must contain only letters.' });
    }

    if (!isValidBirthday(birthDate)) {
        return res.status(400).json({ error: 'Invalid birthday format.' });
    }

    if (getAge(birthDate) < 18) {
        return res.status(403).json({ error: 'You must be at least 18 years old to open an account.' });
    }

    const isUnique = !userData.some(user => user.name === name && user.surname === surname);
    if (!isUnique) {
        return res.status(400).json({ error: 'Name and surname combination must be unique.' });
    }

    userData.push({ name, surname, birthDate, balance: 0 });
    return res.status(200).json({ success: 'Account created successfully.' });
});

accountRouter.get('/:name-:surname', (req, res) => {
    const { name, surname } = req.params;
    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    if (user) {
        return res.status(200).json({
            success: `User real name: "${user.name} ${user.surname}", date of birth: ${user.birthDate}.`
        });
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
});

accountRouter.delete('/:name-:surname', (req, res) => {
    const { name, surname } = req.params;

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );
    const user = userData[userIndex];

    if (userIndex !== -1) {
        if (user.balance === 0) {
            userData.splice(userIndex, 1);
            return res.status(200).json({ success: `User "${user.name} ${user.surname}" has been successfully deleted.` });
        } else {
            return res.status(400).json({ error: `Deletion failed: User "${user.name} ${user.surname}" has a balance of ${user.balance} USD.` });
        }
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
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
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!newName || !newSurname || !newBirthDate) {
        return res.status(400).json({ error: 'Name, surname, and birth date are required.' });
    }

    if (!isAlphabetic(newName) || !isAlphabetic(newSurname)) {
        return res.status(400).json({ error: 'Name and surname must contain only letters.' });
    }

    if (!isValidBirthday(newBirthDate)) {
        return res.status(400).json({ error: 'Invalid birthday format.' });
    }

    if (getAge(newBirthDate) < 18) {
        return res.status(403).json({ error: "Users can't be younger than 18." });
    }

    const isUnique = !userData.some((user, index) =>
        index !== userIndex && user.name === newName && user.surname === newSurname
    );

    if (!isUnique) {
        return res.status(400).json({ error: 'Name and surname combination must be unique.' });
    }

    userData[userIndex] = { name: newName, surname: newSurname, birthDate: newBirthDate };
    return res.status(200).json({ success: 'Account updated successfully.' });
});