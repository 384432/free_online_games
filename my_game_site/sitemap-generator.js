const fs = require('fs');
const path = require('path');

// 读取games.json
const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// 生成sitemap.xml
function generateSitemap(games) {
    const today = new Date().toISOString().split('T')[0];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;

    // 为每个游戏生成URL
    games.forEach(game => {
        const slug = generateSlug(game.title);
        sitemap += `
    <url>
        <loc>https://yourdomain.com/game/${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });

    sitemap += '\n</urlset>';
    return sitemap;
}

// 生成URL友好的slug
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// 生成并保存sitemap
const sitemap = generateSitemap(gamesData);
fs.writeFileSync('sitemap.xml', sitemap);
console.log('Sitemap generated successfully!'); 