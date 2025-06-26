import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { dayjs } from '@/utils/dayjs'

interface PostCardProps {
  post: {
    id: string
    title: string
    subtitle: string | null
    content: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
  }
}

const PostCard = ({ post }: PostCardProps) => {
  function getReadingTime(content: string) {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min de leitura`
  }

  function isRecentPost(createdAt: Date) {
    const now = new Date()
    const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
    return diffInHours <= 24
  }

  return (
    <Card
      key={post.id}
      className="pt-0 transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            width={400}
            height={200}
            className="h-48 w-full rounded-t-md object-cover transition-transform duration-200 hover:scale-105"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-48 w-full items-center justify-center rounded-t-md text-sm">
            Sem imagem disponível
          </div>
        )}
        {isRecentPost(post.createdAt) && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
            <Clock className="mr-1 size-3" />
            Novo
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="cursor-pointer truncate text-lg leading-tight">
          {post.title}
        </CardTitle>
        {post.subtitle && (
          <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
            {post.subtitle}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-muted-foreground mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Calendar className="size-3" />
            <span>{dayjs(post.createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <span className="text-muted-foreground">
            {getReadingTime(post.content)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/post/${post.id}`}>Ler mais</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { PostCard }
