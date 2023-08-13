import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const articlesDirectory = "./src/mdx";

const staticRoutes = [
  '/',
  '/about',
];

const getArticles = () => {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(filename => fs.statSync(path.join(articlesDirectory, filename)).isFile())
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter } = grayMatter(fileContent);

      let lastMod;
      if (frontMatter.date) {
        const [day, month, year] = frontMatter.date.split('-');
        const date = new Date(year, month - 1, day);
        lastMod = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }

      return {
        url: '/' + path.parse(filename).name,
        lastMod: lastMod,
      };
    });
};

const articles = getArticles();

const urls = [...staticRoutes.map(route => ({ url: route })), ...articles];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ url, lastMod }) => `
    <url>
      <loc>https://saugar.dev${url}</loc>
      ${lastMod ? `<lastmod>${lastMod}</lastmod>` : ''}
      <priority>0.7</priority>
    </url>
  `
    )
    .join('')}
</urlset>
`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
