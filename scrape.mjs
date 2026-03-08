import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.joessalmonlodge.com';
const TARGET_URLS = [
    'https://www.joessalmonlodge.com/',
    'https://www.joessalmonlodge.com/about',
    'https://www.joessalmonlodge.com/gallery'
];

const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'scraped_images');

if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Generate a slug from Wix image URL or alt text
const getSlug = (urlStr) => {
    const match = urlStr.match(/\/([a-z0-9_-]+\.(?:jpg|png|webp|jpeg))/i);
    return match ? match[1] : `image_${Date.now()}.jpg`;
};

async function scrapeImages() {
    const imageUrls = new Set();
    const imageMetadata = [];

    for (const url of TARGET_URLS) {
        try {
            console.log(`Scraping: ${url}`);
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Wix stores images in nested tags, wow-image, object, or style background
            $('img').each((i, el) => {
                let src = $(el).attr('src') || $(el).attr('data-src');
                let alt = $(el).attr('alt') || '';

                if (src && src.includes('static.wixstatic.com/media/')) {
                    // clean up wix image URLs which might have /v1/fill/...
                    // Just get the raw image URL if possible
                    const rawMatch = src.match(/(https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp))/);
                    if (rawMatch) {
                        src = rawMatch[1];
                    }
                    if (!imageUrls.has(src)) {
                        imageUrls.add(src);
                        const fileName = `img_${imageUrls.size}_${alt.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 20)}.jpg`;
                        imageMetadata.push({ src, alt, fileName });
                    }
                }
            });

            // Inline styles for backgrounds
            $('[style*="background-image"]').each((i, el) => {
                const style = $(el).attr('style');
                const match = style.match(/url\(['"]?(https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp))[^'"]*['"]?\)/);
                if (match && !imageUrls.has(match[1])) {
                    imageUrls.add(match[1]);
                    const fileName = `bg_${imageUrls.size}.jpg`;
                    imageMetadata.push({ src: match[1], alt: 'Background', fileName });
                }
            });
        } catch (err) {
            console.error(`Failed to scrape ${url}:`, err.message);
        }
    }

    console.log(`Found ${imageMetadata.length} unique images. Downloading...`);

    const results = [];

    for (const item of imageMetadata) {
        try {
            const response = await axios({
                url: item.src,
                method: 'GET',
                responseType: 'stream'
            });

            const filePath = path.join(DOWNLOAD_DIR, item.fileName);
            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            results.push({
                localPath: `/scraped_images/${item.fileName}`,
                originalAlt: item.alt,
                originalSrc: item.src
            });
            console.log(`Downloaded: ${item.fileName}`);
        } catch (e) {
            console.error(`Failed to download ${item.src}`);
        }
    }

    // Write mapping
    fs.writeFileSync(path.join(process.cwd(), 'src', 'image-mapping.json'), JSON.stringify(results, null, 2));
    console.log('Complete. Mapping saved to src/image-mapping.json');
}

scrapeImages();
