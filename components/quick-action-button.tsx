'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ViolationModal } from './violation-modal'

export function QuickActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20"
        title="Input Poin Pelanggaran Cepat"
      >
        <Plus className="w-6 h-6" />
      </button>

      <ViolationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
