import Link from 'next/link'

import { ToggleTheme } from './theme-toggle'
import { Button } from './ui/button'
import { UserButton } from './user-button'

const Header = () => {
  return (
    <div className="flex items-center justify-between rounded-md border !p-3">
      <Link href="/" className="text-xl font-semibold">
        Notícias
      </Link>
      <div className="flex items-center gap-2">
        <ToggleTheme />
        <Button variant="secondary" asChild>
          <Link href="/admin">Área Administrativa</Link>
        </Button>
        <UserButton />
      </div>
    </div>
  )
}

export { Header }
