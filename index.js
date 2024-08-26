import express from 'express';

const app = express();
const port = 5020;

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});