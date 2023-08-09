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
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight mx-5">Articles</h1>
      <section className='py-5 max-w-2xl'>
        <div className=''>
          {articles.map(article => (
            <Link className='py-3 px-5 flex justify-between align-middle gap-2 hover:bg-accent dark:hover:text-primary rounded-md focus:bg-accent focus:outline-none focus-visible:outline-none' href={'/' + article.slug} passHref key={article.slug}>
              <div>
                <h2 className="text-lg">{article.meta.title}</h2>
                <p className="text-muted-foreground truncate w-64 lg:w-[34em]">{article.meta.description}</p>
              </div>
              <div className="my-auto text-muted-foreground">
                <p>{article.meta.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
