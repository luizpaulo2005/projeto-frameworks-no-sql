'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Edit, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updatePost } from '@/actions/update-post'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const updatePostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  imageUrl: z.string().optional().or(z.string().url('URL inválida')),
})

type UpdatePostSchema = z.infer<typeof updatePostSchema>

interface UpdatePostProps {
  post: {
    id: string
    title: string
    subtitle: string | null
    content: string
    imageUrl: string | null
  }
}

const UpdatePost = ({ post }: UpdatePostProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title,
      subtitle: post.subtitle || '',
      content: post.content,
      imageUrl: post.imageUrl || '',
    },
  })

  const handleUpdatePost = async (data: UpdatePostSchema) => {
    setIsSubmitting(true)
    try {
      await updatePost({ id: post.id, ...data })
      toast.success('Post atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao atualizar post:', error)
      toast.error('Erro ao atualizar o post. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          reset({
            title: post.title,
            subtitle: post.subtitle || '',
            content: post.content,
            imageUrl: post.imageUrl || '',
          })
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
            <Input id="subtitle" {...register('subtitle')} />
            {errors.subtitle && (
              <p className="text-sm text-red-500">{errors.subtitle.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea id="content" rows={4} {...register('content')} />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem (opcional)</Label>
            <Input id="imageUrl" {...register('imageUrl')} />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="animate-spin" />}
            Atualizar post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { UpdatePost }
