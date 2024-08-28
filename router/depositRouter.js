import express from 'express';
import userData from '../data/userData.js'
import { validateAmount } from '../validations/amountValidations.js';
export const depositRouter = express.Router();

depositRouter.post('/:name-:surname', (req, res) => {
    const { amount } = req.body;
    const { name, surname } = req.params;
    const amountInCents = amount * 100;

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const user = userData.find(user =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.surname.toLowerCase() === surname.toLowerCase()
    );

    if (!user) {
        return res.status(404).json({ error: `User: "${name} ${surname}" not found.` });
    }

    if (!validateAmount(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!Number.isInteger(amount)) {
        return res.status(400).json({ error: 'Amount must be a whole number, no cents allowed.' });
    }

    user.balance += amountInCents;
    res.status(200).json({ success: `${user.name} ${user.surname}'s deposit of "${amount}" USD was successful.` });
});