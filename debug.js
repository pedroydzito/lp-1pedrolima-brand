const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('views/roger-nobles.html', 'utf8');
const $ = cheerio.load(html);

// Find the word "Love Grows" and trace back to the player
$(':contains("Love Grows")').each((i, el) => {
    // get closest container that is likely the player
    const parent = $(el).closest('.elementor-widget, .player, .audio, .sonaar');
    if (parent.length && parent.html()) {
        console.log(parent.parent().html().substring(0, 500));
    }
});
