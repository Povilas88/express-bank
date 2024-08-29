import express from 'express';
import userData from '../../data/userData.js'
import { isValidString, isValidRequest } from '../../validations/userValidations.js';
export const nameRouter = express.Router();

nameRouter.get('/:name-:surname/name', (req, res) => {
    const { name, surname } = req.params;
    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const nameError = isValidString(name, 'Name');

    if (nameError) {
        return res.status(400).json({ error: nameError });
    }

    if (user) {
        return res.status(200).json({
            success: `User real name: "${user.name}".`
        });
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
});

nameRouter.put('/:name-:surname/name', (req, res) => {
    const { name, surname } = req.params;
    const { newName } = req.body;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    const userIndex = userData.findIndex(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (userIndex === -1) {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!newName) {
        return res.status(400).json({ error: 'New name is required.' });
    }

    const nameError = isValidString(name, 'Name');

    if (nameError) {
        return res.status(400).json({ error: nameError });
    }

    const isUnique = !userData.some((user, index) =>
        index !== userIndex && user.name === newName && user.surname === surname
    );

    if (!isUnique) {
        return res.status(400).json({ error: 'Name must be unique for the given surname.' });
    }

    userData[userIndex].name = newName;
    return res.status(200).json({ success: 'Account name updated successfully.' });
});