'use client'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { getPosts } from '@/actions/get-posts'

import { PostsTable } from './posts-table'

const Page = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Erro ao carregar os posts.</p>
      </div>
    )
  }

  const { posts } = data

  return <PostsTable posts={posts} />
}

export default Page
