'use server'

import { prisma } from '@/utils/prisma'

const getPost = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return { post }
  } catch (error) {
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }
}

export { getPost }
