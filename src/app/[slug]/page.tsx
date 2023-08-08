import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc';

import Button from '@/components/mdx/Button';
import NotFound from '@/components/404';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/mdx'));

  const paths = files.map(filename => ({
    slug: filename.replace('.mdx', '')
  }))

  return paths;
}

function getArticle({ slug }: { slug: string }) {
  const filePath = path.join('src', 'mdx', slug + '.mdx');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null; // or throw new Error(`File not found: ${filePath}`);
  }

  const markdownFile = fs.readFileSync(filePath, 'utf-8');

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}


export async function generateMetadata({ params } : any) {
  const article = getArticle(params);

  if (article) 
  return{
    title: article.frontMatter.title,
    description: article.frontMatter.description,
  }
}

export default function Article({ params } :any) {
  const props = getArticle(params);

  if (!props) {
    return (
      <NotFound />
    )
  }

  return (
    <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={{Button}}/>
    </article>
  )
}