import { Header } from '@/components/header'

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      {children}
    </div>
  )
}

export default ApplicationLayout
