import express from 'express';
import userData from '../data/userData.js'
import { validateAmount } from '../validations/amountValidations.js';
import { isValidRequest } from '../validations/userValidations.js';
export const transferRouter = express.Router();

transferRouter.post('/:fromName-:fromSurname/:toName-:toSurname', (req, res) => {
    const { amount } = req.body;
    const { fromName, fromSurname, toName, toSurname } = req.params;
    const amountInCents = amount * 100;
    const roundedAmount = Math.round(amountInCents) / 100;

    if (!isValidRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid body request.' });
    }

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

    if (!amount) {
        return res.status(404).json({ error: `Amount required` });
    }

    if (!sender) {
        return res.status(404).json({ error: `Sender: "${fromName} ${fromSurname}" not found.` });
    }

    if (!receiver) {
        return res.status(404).json({ error: `Receiver: "${toName} ${toSurname}" not found.` });
    }

    if (sender.name.toLowerCase() === receiver.name.toLowerCase() &&
        sender.surname.toLowerCase() === receiver.surname.toLowerCase()) {
        return res.status(400).json({ error: 'Self-transfer is not allowed.' });
    }

    if (!validateAmount(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    if (amount !== roundedAmount) {
        return res.status(400).json({ error: 'Invalid amount, cannot exceed 2 decimals.' });
    }

    if (sender.balance < amountInCents) {
        return res.status(400).json({ error: 'Insufficient balance.' });
    }

    sender.balance -= amountInCents;
    receiver.balance += amountInCents;
    res.status(200).json({
        success: `Transfer of "${amount.toFixed(2)}" USD from ${sender.name} ${sender.surname} 
        to ${receiver.name} ${receiver.surname} was successful.`
    });
});