const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Setup routes for projects
const projects = [
    'luna-sheeny',
    'martin-dahmer',
    'priscila-elpo',
    'robison-kunz',
    'roger-nobles',
    'vitor-dos-santos'
];

projects.forEach(project => {
    app.get('/' + project, (req, res) => {
        res.sendFile(path.join(__dirname, 'views', project + '.html'));
    });
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});