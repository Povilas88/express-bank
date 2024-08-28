import express from 'express';
import userData from '../data/userData.js'
import { validateAmount } from '../validations/amountValidations.js';
export const withdrawalRouter = express.Router();

withdrawalRouter.post('/:name-:surname', (req, res) => {
    const { amount } = req.body;
    const { name, surname } = req.params;

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

    if (!validateAmount(amount) || amount > user.balance) {
        return res.status(400).json({ error: 'Invalid amount or insufficient balance' });
    }

    user.balance -= amount;
    res.status(200).json({ success: `${user.name} ${user.surname}'s withdrawal of "${amount}" USD was successful.` });
});