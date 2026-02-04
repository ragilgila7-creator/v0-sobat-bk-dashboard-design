import { Users, MessageCircle, AlertTriangle, Activity, Eraser as UserAlert } from 'lucide-react'

const stats = [
  {
    title: 'Total Siswa',
    value: '342',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    change: '+12 bulan ini',
  },
  {
    title: 'Sesi Konseling Aktif',
    value: '28',
    icon: MessageCircle,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    change: 'Minggu ini',
  },
  {
    title: 'Total Pelanggaran Bulan Ini',
    value: '47',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    change: '-8% dari bulan lalu',
  },
  {
    title: 'Siswa Perlu Perhatian',
    value: '15',
    icon: Activity,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    change: 'High points',
  },
]

export function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon
        return (
          <div
            key={stat.title}
            className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-3">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
