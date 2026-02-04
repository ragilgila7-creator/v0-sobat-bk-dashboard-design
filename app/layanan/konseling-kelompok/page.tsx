'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Plus, Users, Calendar } from 'lucide-react'

const groups = [
  { id: 1, nama: 'Kelompok A - Manajemen Stres', peserta: 8, tanggal: '2024-01-15', topik: 'Manajemen Stres' },
  { id: 2, nama: 'Kelompok B - Keterampilan Sosial', peserta: 7, tanggal: '2024-01-18', topik: 'Keterampilan Sosial' },
  { id: 3, nama: 'Kelompok C - Persiapan Karir', peserta: 9, tanggal: '2024-01-22', topik: 'Eksplorasi Karir' },
]

export default function KonselingKelompokPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Konseling Kelompok"
        description="Layanan konseling kelompok untuk pengembangan siswa"
      >
        <div className="space-y-6">
          {/* Add Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Buat Kelompok Baru
            </Button>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-foreground text-lg mb-4">{group.nama}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{group.peserta} Peserta</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(group.tanggal).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="bg-primary/10 rounded p-2">
                    <p className="text-sm text-primary font-medium">{group.topik}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">Lihat Detail</Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Edit</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="bg-secondary/10 border border-secondary rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Panduan Konseling Kelompok</h3>
            <p className="text-muted-foreground">
              Konseling kelompok adalah layanan bimbingan yang diberikan kepada sekelompok siswa untuk mengatasi masalah bersama melalui dinamika kelompok. Efektif untuk membangun keterampilan sosial dan saling mendukung.
            </p>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
