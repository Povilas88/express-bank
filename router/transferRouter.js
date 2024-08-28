import express from 'express';
import userData from '../data/userData.js'
import { validateAmount } from '../validations/amountValidations.js';
export const transferRouter = express.Router();

transferRouter.post('/:fromName-:fromSurname/:toName-:toSurname', (req, res) => {
    const { amount } = req.body;
    const { fromName, fromSurname, toName, toSurname } = req.params;

    if (userData.length === 0) {
        return res.status(404).json({ error: 'User data array is empty.' });
    }

    const sender = userData.find(user =>
        user.name.toLowerCase() === fromName.toLowerCase() &&
        user.surname.toLowerCase() === fromSurname.toLowerCase()
    );

    const receiver = userData.find(user =>
        user.name.toLowerCase() === toName.toLowerCase() &&
        user.surname.toLowerCase() === toSurname.toLowerCase()
    );

    if (!sender) {
        return res.status(404).json({ error: `Sender: "${fromName} ${fromSurname}" not found.` });
    }

    if (!receiver) {
        return res.status(404).json({ error: `Receiver: "${toName} ${toSurname}" not found.` });
    }

    if (!validateAmount(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    if (sender.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;
    res.status(200).json({
        success: `Transfer of "${amount}" USD from ${sender.name} ${sender.surname} 
        to ${receiver.name} ${receiver.surname} was successful.`
    });
});