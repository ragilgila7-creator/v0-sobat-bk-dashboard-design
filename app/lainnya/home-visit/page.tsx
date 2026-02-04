'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, MapPin, Calendar } from 'lucide-react'

const visits = [
  { id: 1, siswa: 'Ahmad Reza Pratama', nis: '2024001', tanggal: '2024-01-10', alamat: 'Jl. Merdeka No. 15', alasan: 'Konsultasi Akademik', status: 'completed' },
  { id: 2, siswa: 'Siti Nurhaliza', nis: '2024002', tanggal: '2024-01-12', alamat: 'Jl. Sudirman No. 42', alasan: 'Follow-up Konseling', status: 'completed' },
  { id: 3, siswa: 'Budi Santoso', nis: '2024003', tanggal: '2024-01-20', alamat: 'Jl. Ahmad Yani No. 8', alasan: 'Kunjungan Pembinaan', status: 'upcoming' },
  { id: 4, siswa: 'Rina Wijaya', nis: '2024004', tanggal: '2024-01-22', alamat: 'Jl. Gatot Subroto No. 99', alasan: 'Penyelesaian Masalah Keluarga', status: 'upcoming' },
]

export default function HomeVisitPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Home Visit"
        description="Kelola kunjungan rumah dan data keluarga siswa"
      >
        <div className="space-y-6">
          {/* Add Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Jadwalkan Kunjungan
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Kunjungan</p>
              <p className="text-2xl font-bold text-primary mt-2">12</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Bulan Ini</p>
              <p className="text-2xl font-bold text-secondary mt-2">4</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{visits.filter(v => v.status === 'completed').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Terjadwal</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{visits.filter(v => v.status === 'upcoming').length}</p>
            </div>
          </div>

          {/* Visits Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Daftar Kunjungan</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Siswa</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">NIS</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Tanggal</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Alamat</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Alasan</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((visit) => (
                    <TableRow key={visit.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-foreground">{visit.siswa}</TableCell>
                      <TableCell className="text-muted-foreground">{visit.nis}</TableCell>
                      <TableCell className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(visit.tanggal).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-muted-foreground flex items-center gap-2 max-w-xs">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{visit.alamat}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{visit.alasan}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          visit.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {visit.status === 'completed' ? 'Selesai' : 'Terjadwal'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-secondary/10 border border-secondary rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Panduan Home Visit</h3>
            <p className="text-muted-foreground mb-4">
              Home Visit adalah kunjungan ke rumah siswa untuk:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Memahami kondisi lingkungan dan keluarga siswa</li>
              <li>Membangun hubungan yang lebih baik dengan orang tua/wali</li>
              <li>Memberikan dukungan dan konseling langsung di rumah</li>
              <li>Mengidentifikasi faktor-faktor yang mempengaruhi perilaku dan prestasi siswa</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
