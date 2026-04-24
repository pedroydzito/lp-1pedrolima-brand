const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(viewsDir, file), 'utf8');
    const $ = cheerio.load(html);

    // 1. Inject links in head
    if (!$('link[href="/css/design_system.css"]').length) {
        $('head').append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">\n');
        $('head').append('<link rel="stylesheet" href="/css/design_system.css">\n');
    }

    // 2. Replace tags (SVGs) with Code
    // We look for img src containing the specific SVG filenames
    const tagMap = {
        'butt_projetos.svg': 'Projetos Selecionados',
        'Rebrand-Design.svg': 'Rebrand Design',
        'Brand-Implementation.svg': 'Brand Implementation',
        'Brand-Design.svg': 'Brand Design'
    };

    $('img').each((i, el) => {
        const src = $(el).attr('src') || '';
        for (const [filename, text] of Object.entries(tagMap)) {
            if (src.includes(filename)) {
                // Determine if it should be light-theme based on some context
                // For now, let's assume if it is butt_projetos it's dark
                // The Rebrand-Design in the image looks like it's on a white background, so let's add light-theme class
                let themeClass = '';
                if (filename !== 'butt_projetos.svg') {
                    // Most sub-pages have white backgrounds for the tags based on design
                    themeClass = ' light-theme';
                }

                const newHtml = `<div class="lima-tag${themeClass}"><span>${text}</span></div>`;
                $(el).replaceWith(newHtml);
            }
        }
    });

    // Write back
    fs.writeFileSync(path.join(viewsDir, file), $.html(), 'utf8');
});

console.log('HTML files patched with CSS links and tags converted to code.');
