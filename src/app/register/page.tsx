import { House } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { RegisterForm } from './register-form'

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-2rem)] items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="flex items-center gap-2">
          <Button size="icon" variant="secondary" asChild>
            <Link href="/">
              <House />
            </Link>
          </Button>
          <CardTitle className="text-2xl font-semibold">Criar conta</CardTitle>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default Page
