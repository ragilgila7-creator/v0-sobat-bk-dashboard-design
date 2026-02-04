'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Database, BookOpen, AlertCircle, Home, FileText, Menu, X, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navigationItems = [
    {
      category: 'Utama',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/database-siswa', label: 'Database Siswa', icon: Database },
      ],
    },
    {
      category: 'Layanan BK',
      items: [
        { href: '/layanan/bimbingan-klasikal', label: 'Bimbingan Klasikal (RPL)', icon: BookOpen },
        { href: '/layanan/konseling-individual', label: 'Konseling Individual', icon: BookOpen },
        { href: '/layanan/konseling-kelompok', label: 'Konseling Kelompok', icon: BookOpen },
      ],
    },
    {
      category: 'Kedisiplinan',
      items: [
        { href: '/kedisiplinan/poin-pelanggaran', label: 'Poin Pelanggaran', icon: AlertCircle },
        { href: '/kedisiplinan/input-pelanggaran', label: 'Input Pelanggaran Cepat', icon: AlertCircle },
        { href: '/kedisiplinan/kelola-pelanggaran', label: 'Kelola Jenis Pelanggaran', icon: Settings },
      ],
    },
    {
      category: 'Lainnya',
      items: [
        { href: '/lainnya/home-visit', label: 'Home Visit', icon: Home },
        { href: '/lainnya/laporan-bulanan', label: 'Laporan Bulanan', icon: FileText },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sidebar-primary to-sidebar-accent bg-clip-text text-transparent">
            SobatBK
          </h1>
          <p className="text-xs mt-1 opacity-75">Manajemen Bimbingan Konseling</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationItems.map((section) => (
            <div key={section.category}>
              <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
                {section.category}
              </h3>
              <div className="space-y-1">
                {section.items.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href}>
                    <button
                      onClick={() => setIsOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        isActive(href)
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs opacity-60">copyright @ 2026 Amri Muqaffi Fatih</p>
        </div>
      </aside>
    </>
  )
}
