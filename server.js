const express = require('express');
const path = require('path');
const https = require('https');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Compressão gzip/brotli para todas as respostas de texto
app.use(compression({ level: 6 }));

// Cache agressivo para assets estáticos (imagens, CSS, JS, fontes)
// 1 ano de cache para assets com hash/versão; 1 dia para o restante
app.use('/assets', (req, res, next) => {
    const ext = path.extname(req.path).toLowerCase();
    const immutable = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.woff2', '.woff', '.ttf', '.css', '.js', '.mp3', '.mp4'];
    if (immutable.includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
        res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    next();
});

app.use('/css', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
});

app.use('/js', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(`User-agent: *
Allow: /

Sitemap: https://brand.1pedrolima.com/sitemap.xml
`);
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'FavIcon.jpg'));
});

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

// Sitemap dinâmico — atualiza automaticamente quando novos projetos são adicionados ao array `projects`
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://brand.1pedrolima.com';
    const pageLastMod = {
        '/': '2026-10-10',
        'luna-sheeny': '2026-07-23',
        'martin-dahmer': '2026-07-23',
        'priscila-elpo': '2026-07-23',
        'robison-kunz': '2026-07-23',
        'roger-nobles': '2026-07-23',
        'vitor-dos-santos': '2026-07-23'
    };

    const urls = [
        { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly', lastmod: pageLastMod['/'] },
        ...projects.map(p => ({
            loc: `${baseUrl}/${p}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: pageLastMod[p] || '2026-07-23'
        }))
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(xml);
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