import { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="flex-1 lg:ml-64">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="p-4 lg:p-8">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}
