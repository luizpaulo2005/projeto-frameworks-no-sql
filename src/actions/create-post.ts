'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { prisma } from '@/utils/prisma'

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional().or(z.string().url('Invalid URL')),
})

type CreatePostSchema = z.infer<typeof createPostSchema>

const createPost = async (data: CreatePostSchema) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized: You must be logged in to create a post')
  }

  const { title, subtitle, content, imageUrl } = createPostSchema.parse(data)

  await prisma.post.create({
    data: {
      authorId: session.user.id,
      title,
      subtitle: subtitle || null,
      content,
      imageUrl: imageUrl || null,
    },
  })

  return { success: true, message: 'Post created successfully' }
}

export { createPost }
