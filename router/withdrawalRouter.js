import express from 'express';
import userData from '../data/userData.js'
import { validateAmount } from '../validations/amountValidations.js';
import { isValidRequest, isValidString } from '../validations/userValidations.js';

export const withdrawalRouter = express.Router();

withdrawalRouter.post('/:name-:surname', (req, res) => {
    const { amount } = req.body;
    const { name, surname } = req.params;
    const amountInCents = amount * 100;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    const nameError = isValidString(name, 'Name');
    const surnameError = isValidString(surname, 'Surname');

    if (nameError || surnameError) {
        return res.status(400).json({ error: nameError || surnameError });
    }

    if (!user) {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!validateAmount(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!Number.isInteger(amount)) {
        return res.status(400).json({ error: 'Amount must be a whole number.' });
    }

    if (user.balance < amountInCents) {
        return res.status(400).json({ error: 'Insufficient balance for this withdrawal.' });
    }

    user.balance -= amountInCents;
    res.status(200).json({ success: `${user.name} ${user.surname}'s withdrawal of "${amount}" USD was successful.` });
});