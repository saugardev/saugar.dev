import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

export default function Article() {
  
  const articlesDir = "src/mdx"
  const fileNames = fs.readdirSync(articlesDir);

  const articles = fileNames
    .filter(filename => {
      console.log(fileNames);
      return fs.statSync(path.join(articlesDir, filename)).isFile();
    })
    .map(filename => {
      const fileContent = fs.readFileSync(path.join(articlesDir, filename), 'utf-8');
      const { data: frontMatter } = matter(fileContent);
      return {
        meta: frontMatter,
        slug: path.parse(filename).name
      };
    });

  return (
    <div className='space-y-2'>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight">Articles</h1>

      <section className='py-5 max-w-xl'>
        <div className='py-2'>
          {articles.map(article => (
            <Link href={'/' + article.slug} passHref key={article.slug}>
              <div className='py-2 flex justify-between align-middle gap-2'>
                  <div>
                      <h3 className="text-lg font-bold">{article.meta.title}</h3>
                      <p className="text-gray-400">{article.meta.description}</p>
                  </div>
                  <div className="my-auto text-gray-400">
                      <p>{article.meta.date}</p>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
