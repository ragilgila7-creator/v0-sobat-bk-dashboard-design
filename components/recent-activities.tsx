import { Clock, AlertCircle, MessageCircle, FileText } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const activities = [
  {
    id: 1,
    siswa: 'Ahmad Reza Pratama',
    nis: '2024001',
    tipe: 'Konseling Individual',
    icon: MessageCircle,
    keterangan: 'Diskusi masalah akademik',
    waktu: '2 jam yang lalu',
    status: 'completed',
  },
  {
    id: 2,
    siswa: 'Siti Nurhaliza',
    nis: '2024002',
    tipe: 'Input Pelanggaran',
    icon: AlertCircle,
    keterangan: 'Terlambat masuk kelas - 5 poin',
    waktu: '3 jam yang lalu',
    status: 'recorded',
  },
  {
    id: 3,
    siswa: 'Budi Santoso',
    nis: '2024003',
    tipe: 'Bimbingan Klasikal',
    icon: FileText,
    keterangan: 'RPL: Keterampilan komunikasi',
    waktu: '5 jam yang lalu',
    status: 'completed',
  },
  {
    id: 4,
    siswa: 'Rina Wijaya',
    nis: '2024004',
    tipe: 'Konseling Kelompok',
    icon: MessageCircle,
    keterangan: 'Sesi pengelolaan stres',
    waktu: '1 hari yang lalu',
    status: 'completed',
  },
  {
    id: 5,
    siswa: 'Doni Hermawan',
    nis: '2024005',
    tipe: 'Input Pelanggaran',
    icon: AlertCircle,
    keterangan: 'Tidak mengerjakan PR - 3 poin',
    waktu: '1 hari yang lalu',
    status: 'recorded',
  },
]

function getStatusBadge(status: string) {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    recorded: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  const labels = {
    completed: 'Selesai',
    recorded: 'Tercatat',
    pending: 'Menunggu',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  )
}

export function RecentActivities() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Aktivitas Terbaru</h3>
        </div>
        <p className="text-sm text-muted-foreground">Konseling dan pelanggaran yang baru dicatat</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Siswa</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">NIS</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Tipe Aktivitas</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Keterangan</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <TableRow key={activity.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="py-4 text-sm font-medium text-foreground">{activity.siswa}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{activity.nis}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{activity.tipe}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{activity.keterangan}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{activity.waktu}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
