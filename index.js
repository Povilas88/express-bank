import express from 'express';
import { accountRouter } from './router/account/accountRouter/accountRouter.js';
import { depositRouter } from './router/depositRouter.js';
import { withdrawalRouter } from './router/withdrawalRouter.js';
import { transferRouter } from './router/transferRouter.js';

const app = express();
const port = 5020;

app.use(express.json({
    type: 'application/json',
}));

app.use(express.urlencoded({ extended: true }));

app.use('/api/account', accountRouter);
app.use('/api/deposit', depositRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/transfer', transferRouter);

app.get('/', (req, res) => {
    return res.send('Nothing to find here, use "Insomnia"');
});

app.get('*', (req, res) => {
    return res.send('404 <br>page not found ☹');
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});