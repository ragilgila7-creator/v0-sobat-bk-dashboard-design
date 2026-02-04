'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Clock, CheckCircle } from 'lucide-react'

const sessions = [
  { id: 1, siswa: 'Ahmad Reza Pratama', topik: 'Masalah Akademik', tanggal: '2024-01-15', jam: '10:00', status: 'completed' },
  { id: 2, siswa: 'Siti Nurhaliza', topik: 'Hubungan Interpersonal', tanggal: '2024-01-16', jam: '14:00', status: 'completed' },
  { id: 3, siswa: 'Budi Santoso', topik: 'Pemilihan Karir', tanggal: '2024-01-20', jam: '11:00', status: 'upcoming' },
  { id: 4, siswa: 'Rina Wijaya', topik: 'Manajemen Emosi', tanggal: '2024-01-21', jam: '13:00', status: 'upcoming' },
]

export default function KonselingIndividualPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Konseling Individual"
        description="Layanan konseling one-on-one untuk siswa"
      >
        <div className="space-y-6">
          {/* Add Button */}
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Jadwalkan Sesi Baru
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Sesi</p>
              <p className="text-2xl font-bold text-primary mt-2">24</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Sesi Bulan Ini</p>
              <p className="text-2xl font-bold text-secondary mt-2">6</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Menunggu Terjadwal</p>
              <p className="text-2xl font-bold text-accent mt-2">3</p>
            </div>
          </div>

          {/* Sessions Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Daftar Sesi Konseling</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Siswa</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Topik</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Tanggal</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Jam</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-foreground">{session.siswa}</TableCell>
                      <TableCell className="text-muted-foreground">{session.topik}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(session.tanggal).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell className="text-muted-foreground">{session.jam}</TableCell>
                      <TableCell>
                        <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                          session.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {session.status === 'completed' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {session.status === 'completed' ? 'Selesai' : 'Terjadwal'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
