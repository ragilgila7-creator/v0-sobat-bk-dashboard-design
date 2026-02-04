'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Download } from 'lucide-react'
import { useState } from 'react'

const violations = [
  { id: 1, siswa: 'Ahmad Reza Pratama', nis: '2024001', kelas: 'XII IPA 1', totalPoin: 15, jenisPelanggaran: 'Membawa HP, Terlambat' },
  { id: 2, siswa: 'Siti Nurhaliza', nis: '2024002', kelas: 'XII IPA 2', totalPoin: 8, jenisPelanggaran: 'Tidak Mengerjakan PR' },
  { id: 3, siswa: 'Budi Santoso', nis: '2024003', kelas: 'XII IPS 1', totalPoin: 22, jenisPelanggaran: 'Membawa HP, Ramai, Tidak Hadir' },
  { id: 4, siswa: 'Rina Wijaya', nis: '2024004', kelas: 'XII IPA 1', totalPoin: 5, jenisPelanggaran: 'Terlambat' },
  { id: 5, siswa: 'Doni Hermawan', nis: '2024005', kelas: 'XI IPA 2', totalPoin: 28, jenisPelanggaran: 'Tidak Hadir, Membawa HP' },
]

function getPoinColor(poin: number) {
  if (poin >= 25) return 'text-red-600 font-bold text-lg'
  if (poin >= 15) return 'text-orange-600 font-bold'
  if (poin >= 8) return 'text-yellow-600 font-bold'
  return 'text-green-600'
}

function getPoinBgColor(poin: number) {
  if (poin >= 25) return 'bg-red-100'
  if (poin >= 15) return 'bg-orange-100'
  if (poin >= 8) return 'bg-yellow-100'
  return 'bg-green-100'
}

export default function PoinPelanggaranPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = violations.filter(
    v => v.siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
         v.nis.includes(searchQuery)
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Poin Pelanggaran"
        description="Pantau dan kelola poin pelanggaran siswa"
      >
        <div className="space-y-6">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari siswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Download className="w-4 h-4" />
              Export Laporan
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Siswa</p>
              <p className="text-2xl font-bold text-primary mt-2">{violations.length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Poin Tinggi (≥25)</p>
              <p className="text-2xl font-bold text-destructive mt-2">{violations.filter(v => v.totalPoin >= 25).length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Poin Sedang (15-24)</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">{violations.filter(v => v.totalPoin >= 15 && v.totalPoin < 25).length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Poin Tercatat</p>
              <p className="text-2xl font-bold text-accent mt-2">{violations.reduce((acc, v) => acc + v.totalPoin, 0)}</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">NIS</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Siswa</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Kelas</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Total Poin</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Jenis Pelanggaran</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((violation) => (
                    <TableRow key={violation.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="font-semibold text-foreground">{violation.nis}</TableCell>
                      <TableCell className="text-foreground">{violation.siswa}</TableCell>
                      <TableCell className="text-muted-foreground">{violation.kelas}</TableCell>
                      <TableCell>
                        <div className={`inline-block px-3 py-1 rounded-lg font-bold ${getPoinBgColor(violation.totalPoin)}`}>
                          <span className={getPoinColor(violation.totalPoin)}>{violation.totalPoin}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{violation.jenisPelanggaran}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Standar Poin Pelanggaran</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Rendah</p>
                <p className="text-sm font-bold text-green-600 mt-1">&lt; 8 Poin</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sedang</p>
                <p className="text-sm font-bold text-yellow-600 mt-1">8-14 Poin</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tinggi</p>
                <p className="text-sm font-bold text-orange-600 mt-1">15-24 Poin</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sangat Tinggi</p>
                <p className="text-sm font-bold text-red-600 mt-1">≥ 25 Poin</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
