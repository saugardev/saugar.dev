import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc';
import Button from '@/components/mdx/Button';

import remarkGfm from 'remark-gfm'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saul Garcia Cespedes - About Me',
  description: 'Full Stack Developer specialized in Typescript, React, Node, PostgreSQL, Angular, Nest, Docker, and AWS',
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  }
}

function Article() {

  function readFile(filePath: string) {
    if (fs.statSync(filePath).isFile()) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content } = matter(fileContent);
      return {
        meta: frontMatter,
        slug: path.parse(filePath).name,
        content
      };
    }
    throw new Error('Given path does not point to a file');
  }
  
  const articlePath = "src/mdx/about/me.mdx";
  const article = readFile(articlePath);

  const { meta, content } = article;
  
  return (
    <article className='prose prose-md lg:prose-lg dark:prose-invert prose-stone lg:mx-0 mx-auto lg:px-5 p-0'>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight">{meta.title}</h1>
      <MDXRemote source={content} components={{Button}} options={options}/>
    </article>
  )
}

export default Article;
