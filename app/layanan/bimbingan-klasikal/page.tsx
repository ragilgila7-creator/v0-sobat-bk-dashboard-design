'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Users, FileText } from 'lucide-react'

const sessions = [
  { id: 1, judul: 'Keterampilan Komunikasi Efektif', kelas: 'XII IPA 1', tanggal: '2024-01-15', peserta: 32 },
  { id: 2, judul: 'Manajemen Waktu dan Stres', kelas: 'XII IPA 2', tanggal: '2024-01-16', peserta: 28 },
  { id: 3, judul: 'Persiapan Masuk Perguruan Tinggi', kelas: 'XII IPS 1', tanggal: '2024-01-18', peserta: 25 },
]

export default function BimbinganKlasikalPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Bimbingan Klasikal (RPL)"
        description="Manajemen bimbingan klasikal untuk semua kelas"
      >
        <div className="space-y-6">
          {/* Add Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Jadwalkan RPL Baru
            </Button>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-lg flex-1 pr-2">{session.judul}</h3>
                  <div className="p-2 bg-primary/10 rounded">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{session.kelas} ({session.peserta} peserta)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(session.tanggal).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1 bg-transparent">Lihat Detail</Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Edit</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State or Info */}
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Panduan RPL</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              RPL (Rencana Pelaksanaan Layanan) adalah sesi bimbingan klasikal yang disampaikan kepada seluruh siswa dalam satu kelas. Fokus pada pengembangan kemampuan dan keterampilan hidup siswa.
            </p>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
