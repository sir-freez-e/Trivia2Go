const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let questions = require('./questions.json');

app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.post('/api/questions/upload', (req, res) => {
    const uploadedQuestions = req.body.questions;
    questions = uploadedQuestions;
    res.json({ message: 'Questions uploaded successfully.' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
