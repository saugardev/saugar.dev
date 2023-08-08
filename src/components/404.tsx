import Link from 'next/link'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="space-y-2">
      <p className="text-xl font-semibold leading-7 text-primary">Upsss...</p>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight">404 - Not found</h1>
      <p className="text-xl text-muted-foreground">Could not find requested resource</p>
      <Link className='flex items-center' href="/">
        <Button className='bg-card hover:text-primary' variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className='ml-4'>Return Home</span>
      </Link>
    </div>
  )
}