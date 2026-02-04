'use client'

import { useState } from 'react'
import { Search, Bell, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
      <div className="p-4 lg:p-8 lg:ml-0">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari siswa berdasarkan Nama atau NIS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex gap-3 items-center">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Breadcrumb or Welcome Message */}
        <div className="mt-4 lg:mt-0">
          <p className="text-sm text-muted-foreground">Selamat datang kembali, Guru BK 👋</p>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Bimbingan Konseling</h1>
        </div>
      </div>
    </header>
  )
}
