import express from 'express';
import userData from '../../data/userData.js'
import { isValidBirthday, isValidRequest, getAge } from '../../validations/userValidations.js';
export const dobRouter = express.Router();

dobRouter.get('/:name-:surname/dob', (req, res) => {
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
            success: `User date of birth: ${user.birthDate}.`
        });
    } else {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }
});

dobRouter.put('/:name-:surname/dob', (req, res) => {
    const { name, surname } = req.params;
    const { newBirthDate } = req.body;

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

    if (!newBirthDate) {
        return res.status(400).json({ error: 'Birth date is required.' });
    }

    if (!isValidBirthday(newBirthDate)) {
        return res.status(400).json({ error: 'Invalid birthday format.' });
    }

    if (getAge(newBirthDate) < 18) {
        return res.status(403).json({ error: "Users can't be younger than 18." });
    }

    userData[userIndex].birthDate = newBirthDate;
    return res.status(200).json({ success: 'Date of birth updated successfully.' });
});