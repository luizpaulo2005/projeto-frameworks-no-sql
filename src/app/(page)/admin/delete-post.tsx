import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deletePost } from '@/actions/delete-post'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeletePostProps {
  postId: string
}

const DeletePost = ({ postId }: DeletePostProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await deletePost(postId)
      toast.success('Post excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao excluir o post:', error)
      toast.error('Erro ao excluir o post. Tente novamente mais tarde.')
    } finally {
      setIsOpen(false)
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Tem certeza que deseja excluir este post?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Todos os dados relacionados a este
          post serão permanentemente removidos.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="animate-spin" />}
            Excluir Post
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeletePost }
