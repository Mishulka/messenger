const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'dist')));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https://*'],
            connectSrc: ["'self'", 'https://*'],
            fontSrc: ["'self'", 'data:', 'https://*'],
        },
    },
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    res.status(200);
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
