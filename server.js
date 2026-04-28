const express = require('express');
const path = require('path');
const https = require('https');

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

// Proxy route for audio files (bypasses hotlink protection and CORS)
app.get('/audio-proxy', (req, res) => {
    const url = req.query.url;
    if (!url || !url.startsWith('https://1pedrolima.com/')) {
        return res.status(403).send('Forbidden');
    }

    const urlObj = new URL(url);
    const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://1pedrolima.com/'
        }
    };

    if (req.headers.range) {
        options.headers['Range'] = req.headers.range;
    }

    const request = https.get(options, (audioRes) => {
        const headers = {
            'Content-Type': audioRes.headers['content-type'] || 'audio/mpeg',
            'Accept-Ranges': audioRes.headers['accept-ranges'] || 'bytes',
        };
        if (audioRes.headers['content-range']) headers['Content-Range'] = audioRes.headers['content-range'];
        if (audioRes.headers['content-length']) headers['Content-Length'] = audioRes.headers['content-length'];

        res.writeHead(audioRes.statusCode, headers);
        audioRes.pipe(res);
    });

    request.on('error', (err) => {
        console.error('Audio proxy error:', err);
        if (!res.headersSent) res.status(500).send('Error fetching audio');
    });
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});