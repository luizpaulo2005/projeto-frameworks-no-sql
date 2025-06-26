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
import { signIn } from '@/lib/auth-client'

const signInSchema = z.object({
  email: z.string().email({ message: 'O e-mail deve ser válido' }),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

type SignIn = z.infer<typeof signInSchema>

const LoginForm = () => {
  const [callbackUrl] = useQueryState('callbackUrl')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const { register, reset, handleSubmit, formState } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  })

  const handleLogin = async (data: SignIn) => {
    setIsSubmitting(true)
    setFormErrors({})

    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset()
          setFormErrors({})
          if (callbackUrl) {
            const redirectUrl = new URL(callbackUrl, window.location.origin)
            redirect(redirectUrl.toString())
          }

          setIsSubmitting(false)

          const redirectUrl = new URL('/admin', window.location.origin)
          redirect(redirectUrl.toString())
        },
        onError: (error) => {
          setIsSubmitting(false)
          if (error.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            setFormErrors({ email: 'E-mail ou senha incorretos' })
          } else {
            setFormErrors({ email: 'Erro ao fazer login, tente novamente' })
          }
        },
      },
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input {...register('email')} type="email" id="email" />
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
          <Input {...register('password')} type="password" id="password" />
          {formState.errors.password && (
            <p className="text-sm text-red-500">
              {formState.errors.password.message}
            </p>
          )}
          {formErrors.password && (
            <p className="text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Button type="button" variant="secondary" className="flex-1" asChild>
          <Link href="/register">Criar conta</Link>
        </Button>
        <Button type="submit" className="flex-1">
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Entrar'}
        </Button>
      </CardFooter>
    </form>
  )
}

export { LoginForm }
