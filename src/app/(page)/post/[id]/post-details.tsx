'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { getPost } from '@/actions/get-post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { dayjs } from '@/utils/dayjs'

interface PostDetailsProps {
  postId: string
}

const PostDetails = ({ postId }: PostDetailsProps) => {
  const { back } = useRouter()

  const { data, isError, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => getPost(postId),
  })

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-7rem)] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex h-[calc(100vh-7rem)] items-center justify-center">
        <p>Erro ao carregar o post.</p>
      </div>
    )
  }

  const { post } = data

  function getReadingTime(content: string) {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  function wasUpdated(createdAt: Date, updatedAt: Date) {
    return updatedAt.getTime() !== createdAt.getTime()
  }

  const readingTime = getReadingTime(post.content)
  const updated = wasUpdated(post.createdAt, post.updatedAt)
  return (
    <main>
      <article className="prose prose-lg max-w-none">
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="lg" onClick={() => back()}>
              <ArrowLeft />
            </Button>
            <h1 className="text-4xl leading-tight font-bold md:text-5xl">
              {post.title}
            </h1>
          </div>

          {post.subtitle && (
            <p className="text-muted-foreground text-xl leading-relaxed">
              {post.subtitle}
            </p>
          )}

          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>
                  Publicado em {dayjs(post.createdAt).format('DD/MM/YYYY')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{readingTime} min de leitura</span>
              </div>
              <div>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span>por</span>
                  <Avatar>
                    {/* @ts-expect-error image type */}
                    <AvatarImage src={post.author.image} />
                    <AvatarFallback>
                      {post.author.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {post.author.name}
                </span>
              </div>
            </div>

            {updated && (
              <div className="text-muted-foreground text-sm">
                <span>
                  Última atualização:{' '}
                  {dayjs(post.updatedAt).format('DD/MM/YYYY')}
                </span>
              </div>
            )}
          </div>
        </div>

        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl || '/placeholder.svg'}
              alt={post.title}
              width={800}
              height={400}
              className="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
            />
          </div>
        )}

        <div className="text-justify leading-relaxed">{post.content}</div>
      </article>

      <div className="mt-12 flex w-full items-center justify-between border-t border-gray-200 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            <p>
              Post ID:{' '}
              <code className="bg-card text-muted-foreground rounded px-2 py-1 text-xs">
                {post.id}
              </code>
            </p>
          </div>
        </div>

        <Button variant="outline" className="w-full sm:w-auto" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para todos os posts
          </Link>
        </Button>
      </div>
    </main>
  )
}

export { PostDetails }
