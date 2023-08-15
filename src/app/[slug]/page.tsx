import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { MDXRemote } from 'next-mdx-remote/rsc';

import Button from '@/components/mdx/Button';
import NotFound from '@/components/404';

import remarkGfm from 'remark-gfm'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  }
}

export async function generateStaticParams() {
  const directoryPath = path.join('src', 'mdx');
  const files = fs.readdirSync(directoryPath);

  const paths = files
    .filter((filename) => {
      const filePath = path.join(directoryPath, filename);
      return fs.statSync(filePath).isFile() && path.extname(filename) === '.mdx';
    })
    .map((filename) => ({
      slug: filename.replace('.mdx', ''),
    }));

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
    keywords: article.frontMatter.keywords + ', saugardev, saul garcia cespedes',
    authors: [{name: 'Saul Garcia Cespedes', url: 'https://saugar.dev/about'}],
    applicationName: 'saugar.dev',
    openGraph: {
      title: article.frontMatter.title,
      description: article.frontMatter.description,
      url: 'https://saugar.dev',
      siteName: 'saugar.dev',
      images: [
        {
          url: article.frontMatter.og ? `https://saugar.dev/${article.frontMatter.og}` : `https://saugar.dev/api/og${article.frontMatter.title}`,
          width: 800,
          height: 600,
          alt: article.frontMatter.og_description
        },
      ],
      locale: 'en_US',
      type: 'website',
    }
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
    <article className='prose prose-md lg:prose-lg dark:prose-invert prose-stone lg:mx-0 mx-auto lg:px-5 p-0'>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight">{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={{Button}} options={options}/>
    </article>
  )
}