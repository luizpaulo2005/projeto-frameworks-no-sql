import { Calendar } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { dayjs } from '@/utils/dayjs'

import { CreatePost } from './create-post'
import { DeletePost } from './delete-post'
import { UpdatePost } from './update-post'

interface PostsTableProps {
  posts: Array<{
    id: string
    title: string
    subtitle: string | null
    content: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    author: {
      id: string
      name: string
      image: string | null
    }
  }>
}

const PostsTable = ({ posts }: PostsTableProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Gerenciar Posts</CardTitle>
          <CardDescription>
            Lista de todos os posts com opções de edição e exclusão.
          </CardDescription>
        </div>
        <CreatePost />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="w-1/2">
                    <div>
                      <Link
                        href={`/post/${post.id}`}
                        className="line-clamp-1 font-medium hover:underline"
                      >
                        {post.title}
                      </Link>
                      {post.subtitle && (
                        <div className="text-muted-foreground line-clamp-1 text-sm">
                          {post.subtitle}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Avatar>
                        {/* @ts-expect-error image type */}
                        <AvatarImage src={post.author.image} />
                        <AvatarFallback>
                          {post.author.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-32 truncate">
                        {post.author.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground flex items-center space-x-1 text-sm">
                      <Calendar className="size-3" />
                      <span>{dayjs(post.createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground flex items-center space-x-1 text-sm">
                      <Calendar className="size-3" />
                      <span>{dayjs(post.updatedAt).format('DD/MM/YYYY')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <UpdatePost post={post} />
                      <DeletePost postId={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export { PostsTable }
