'use server'

import { prisma } from '@/utils/prisma'

const deletePost = async (postId: string) => {
  const postExists = await prisma.post.findUnique({
    where: { id: postId },
  })

  if (!postExists) {
    throw new Error('Post not found')
  }

  await prisma.post.delete({
    where: { id: postId },
  })

  return { success: true, message: 'Post deleted successfully' }
}

export { deletePost }
