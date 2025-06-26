'use server'

import { prisma } from '@/utils/prisma'

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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

  return { posts }
}

export { getPosts }
