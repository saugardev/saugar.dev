import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Calendar from '@/components/Calendar';
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function Article() {

  const articlesDir = "src/mdx"
  const fileNames = fs.readdirSync(articlesDir);

  const articles = fileNames.filter(filename => {
    return fs.statSync(path.join(articlesDir, filename)).isFile();
  }).map(filename => {
    const fileContent = fs.readFileSync(path.join(articlesDir, filename), 'utf-8');
    const { data: frontMatter } = matter(fileContent);
    const [day, month, year] = frontMatter.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return {
      meta: frontMatter,
      date,
      slug: path.parse(filename).name
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const datesWithUrls = articles.map((article) => {
    const dateStr = article.meta.date;
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const url = '/' + article.slug;
    return { date, url };
  });

  return (
    <div className='relative flex flex-col lg:flex-row lg:justify-center space-y-2 lg:space-x-2'>
      <div className='flex-grow'>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight mx-5">Articles</h1>
        <section className='py-5 max-w-2xl'>
          <div className='flex flex-col gap-3'>
            {articles.map(article => (
              <Link className='py-3 px-5 flex justify-between align-middle gap-2 hover:bg-accent dark:hover:text-primary rounded-md focus:bg-accent focus-visible:text-primary focus:outline-none focus-visible:outline-none' href={'/' + article.slug} passHref key={article.slug}>
                <div className='w-full'>
                  <h2 className="text-lg truncate">{article.meta.title}</h2>
                  <div className='flex'>
                    <p className="text-muted-foreground truncate w-2/3">{article.meta.description}</p>
                    <span className='text-muted-foreground w-1/3 text-right'>{formatDate(article.meta.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <aside className=' hidden lg:block'>
        <Calendar selectedDatesWithUrls={datesWithUrls}/>
      </aside>
    </div>
  )
}
