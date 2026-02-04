'use client'

import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Download, FileText, TrendingUp } from 'lucide-react'

const reports = [
  { bulan: 'Januari 2024', tanggal: '01 Feb 2024', status: 'complete', link: '#' },
  { bulan: 'Desember 2023', tanggal: '05 Jan 2024', status: 'complete', link: '#' },
  { bulan: 'November 2023', tanggal: '02 Dec 2023', status: 'complete', link: '#' },
  { bulan: 'Oktober 2023', tanggal: '01 Nov 2023', status: 'complete', link: '#' },
]

const reportStats = [
  { label: 'Total Siswa Terbimbing', value: '342', icon: 'users' },
  { label: 'Sesi Konseling', value: '128', icon: 'message' },
  { label: 'Kasus Ditangani', value: '45', icon: 'alert' },
  { label: 'Pemulihan Positif', value: '38 (84%)', icon: 'check' },
]

export default function LaporanBulananPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Laporan Bulanan"
        description="Akses laporan bulanan aktivitas bimbingan dan konseling"
      >
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportStats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Generate New Report */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Buat Laporan Baru</h3>
                <p className="text-muted-foreground">
                  Hasilkan laporan bulanan komprehensif untuk periode yang dipilih
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 whitespace-nowrap">
                <FileText className="w-4 h-4" />
                Buat Laporan
              </Button>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Laporan Tersedia
              </h3>
            </div>

            <div className="divide-y divide-border">
              {reports.map((report) => (
                <div
                  key={report.bulan}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{report.bulan}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Dibuat: {report.tanggal}</p>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none bg-transparent">
                      Lihat
                    </Button>
                    <Button className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Contents Info */}
          <div className="bg-secondary/10 border border-secondary rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Isi Laporan Bulanan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Statistik</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ Jumlah siswa yang terbimbing</li>
                  <li>✓ Sesi konseling individual</li>
                  <li>✓ Sesi bimbingan klasikal</li>
                  <li>✓ Kasus dan penanganannya</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Analisis</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ Tren masalah siswa</li>
                  <li>✓ Tingkat keberhasilan intervensi</li>
                  <li>✓ Rekomendasi untuk bulan berikutnya</li>
                  <li>✓ Pelaporan kepada kepala sekolah</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
