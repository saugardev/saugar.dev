import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MDXRemote } from 'next-mdx-remote/rsc'

import Button from '@/components/mdx/Button'

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/mdx'))

  const paths = files.map(filename => ({
    slug: filename.replace('.mdx', '')
  }))

  return paths
}

function getArticle({slug}:{slug : string}){
  const markdownFile = fs.readFileSync(path.join('src/mdx',slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    slug,
    content
  }
}

export async function generateMetadata({ params } : any) {
  const article = getArticle(params);

  return{
    title: article.frontMatter.title,
    description: article.frontMatter.description,
  }
}

export default function Article({ params } :any) {
  const props = getArticle(params);

  return (
    <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={{Button}}/>
    </article>
  )
}