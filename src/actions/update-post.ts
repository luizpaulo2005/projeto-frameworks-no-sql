'use server'

import { z } from 'zod'

import { prisma } from '@/utils/prisma'

const updatePostSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional().or(z.string().url('Invalid URL')),
})

type UpdatePostSchema = z.infer<typeof updatePostSchema>

const updatePost = async (data: UpdatePostSchema) => {
  const { id, title, subtitle, content, imageUrl } =
    updatePostSchema.parse(data)

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      subtitle: subtitle || null,
      content,
      imageUrl: imageUrl || null,
    },
  })

  return { success: true, message: 'Post updated successfully' }
}

export { updatePost }
