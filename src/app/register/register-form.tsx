'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/auth-client'

const registerSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().email({ message: 'O e-mail deve ser válido' }),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'A confirmação de senha é obrigatória'),
    avatarUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type Register = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const [callbackUrl] = useQueryState('callbackUrl')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    email?: string
  }>({})
  const {
    register: formRegister,
    reset,
    handleSubmit,
    formState,
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  })

  const handleRegister = async (data: Register) => {
    setIsSubmitting(true)

    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.avatarUrl,
      },
      {
        onSuccess: () => {
          reset()

          if (callbackUrl) {
            const redirectUrl = new URL(callbackUrl, window.location.origin)
            redirect(redirectUrl.toString())
          }

          setIsSubmitting(false)

          const redirectUrl = new URL('/sign-in', window.location.origin)
          redirect(redirectUrl.toString())
        },
        onError: (error) => {
          setIsSubmitting(false)

          if (error.error.code === 'USER_ALREADY_EXISTS') {
            setFormErrors({ email: 'Este e-mail já está em uso.' })
          } else {
            setFormErrors({ email: 'Erro ao registrar. Tente novamente.' })
          }
        },
      },
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input {...formRegister('name')} type="text" id="name" />
          {formState.errors.name && (
            <p className="text-sm text-red-500">
              {formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input {...formRegister('email')} type="email" id="email" />
          {formState.errors.email && (
            <p className="text-sm text-red-500">
              {formState.errors.email.message}
            </p>
          )}
          {formErrors.email && (
            <p className="text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input {...formRegister('password')} type="password" id="password" />
          {formState.errors.password && (
            <p className="text-sm text-red-500">
              {formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            {...formRegister('confirmPassword')}
            type="password"
            id="confirmPassword"
          />
          {formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatarUrl">URL do Avatar (opcional)</Label>
          <Input {...formRegister('avatarUrl')} type="url" id="avatarUrl" />
          {formState.errors.avatarUrl && (
            <p className="text-sm text-red-500">
              {formState.errors.avatarUrl.message}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Button type="button" variant="secondary" className="flex-1" asChild>
          <Link href="/sign-in">Fazer login</Link>
        </Button>
        <Button type="submit" className="flex-1">
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Registrar'}
        </Button>
      </CardFooter>
    </form>
  )
}

export { RegisterForm }
