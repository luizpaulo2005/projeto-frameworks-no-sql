'use client'

import { Loader2 } from 'lucide-react'

import { signOut, useSession } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const UserButton = () => {
  const { data, isPending } = useSession()

  if (isPending) {
    return (
      <Button variant="secondary" disabled size="icon">
        <Loader2 className="animate-spin" />
      </Button>
    )
  }

  if (!data) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Avatar className="size-5">
            {/* @ts-expect-error image type */}
            <AvatarImage src={data?.user.image} />
            <AvatarFallback>{data?.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="max-w-32 truncate">{data?.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton }
