import express from 'express';
import { accountRouter } from './router/accountRouter.js';

const app = express();
const port = 5020;


app.use(express.json({
    type: 'application/json',
}));

app.use(express.urlencoded({ extended: true }));

app.use('/api/account', accountRouter);

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.get('*', (req, res) => {
    return res.send('404 <br>page not found ☹');
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});