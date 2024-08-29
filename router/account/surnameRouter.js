import express from 'express';
import userData from '../../data/userData.js'
import { isValidString, isValidRequest } from '../../validations/userValidations.js';
export const surnameRouter = express.Router();

surnameRouter.get('/:name-:surname/surname', (req, res) => {
    const { name, surname } = req.params;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const surnameError = isValidString(surname, 'Surname');

    if (surnameError) {
        return res.status(400).json({ surnameError });
    }

    if (user) {
        return res.status(200).json({
            success: `User surname: "${user.surname}".`
        });
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
});

surnameRouter.put('/:name-:surname/surname', (req, res) => {
    const { name, surname } = req.params;
    const { newSurname } = req.body;

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userIndex === -1) {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!newSurname) {
        return res.status(400).json({ error: 'New surname is required.' });
    }

    if (!isValidString(newSurname)) {
        return res.status(400).json({ error: 'Surname must contain only letters.' });
    }

    const isUnique = !userData.some((user, index) =>
        index !== userIndex && user.surname === newSurname && user.name === name
    );

    if (!isUnique) {
        return res.status(400).json({ error: 'Surname must be unique for the given name.' });
    }

    userData[userIndex].surname = newSurname;
    return res.status(200).json({ success: 'Account surname updated successfully.' });
});