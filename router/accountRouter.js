import express from 'express';

export const accountRouter = express.Router();

const userData = [];

accountRouter.get('/account', (req, res) => {
    console.log(userData);
    return res.send('account page');
});

accountRouter.post('/account', (req, res) => {
    const { name, surname, birthDate } = req.body;

    if (userData.length === 0) {
        return res.send('Error: User data array is empty.');
    }

    userData.push({ name, surname, birthDate });
    return res.send('Account created successfully.');
});