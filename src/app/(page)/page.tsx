import { Loader2 } from 'lucide-react'

import { getPosts } from '@/actions/get-posts'

import { PostCard } from './post-card'

const Page = async () => {
  const { posts } = await getPosts()

  if (!posts) {
    return <Loader2 className="animate-spin" />
  }

  if (posts.length === 0) {
    return <div>Nenhum post encontrado</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}

export default Page
