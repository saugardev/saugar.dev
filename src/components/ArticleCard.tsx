'use client'

import { formatDate } from "@/lib/utils";
import Link from "next/link";

import AnimatedTitle from "./AnimatedTitle";

interface ArticleCardProps {
  article: {
    meta: {
        [key: string]: any;
    };
    date: Date;
    slug: string;
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link className='py-3 px-5 flex justify-between align-middle gap-2 hover:bg-accent dark:hover:text-primary rounded-md focus:bg-accent focus-visible:text-primary focus:outline-none focus-visible:outline-none' href={'/' + article.slug} passHref key={article.slug}>
      <div className='w-full'>
        <h2 className="text-lg"><AnimatedTitle title={article.meta.title}/></h2>
        <div className='flex'>
          <p className="text-muted-foreground truncate w-2/3">{article.meta.description}</p>
          <span className='text-muted-foreground w-1/3 text-right'>{formatDate(article.meta.date)}</span>
        </div>
      </div>
    </Link>
  );
}
