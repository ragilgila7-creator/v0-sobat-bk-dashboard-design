import { Sidebar } from '@/components/sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { InfoCards } from '@/components/info-cards'
import { TrenMasalahChart } from '@/components/tren-masalah-chart'
import { RecentActivities } from '@/components/recent-activities'
import { QuickActionButton } from '@/components/quick-action-button'
import { ViolationModal } from '@/components/violation-modal'

export const metadata = {
  title: 'Dashboard - SobatBK',
  description: 'Ringkasan informasi bimbingan dan konseling',
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <DashboardHeader />

        {/* Content Area */}
        <div className="p-4 lg:p-8 space-y-6">
          {/* Info Cards */}
          <InfoCards />

          {/* Charts and Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tren Masalah Chart */}
            <div className="lg:col-span-2">
              <TrenMasalahChart />
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">Statistik Cepat</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Konseling Hari Ini</span>
                    <span className="font-semibold text-lg">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Menunggu Tindakan</span>
                    <span className="font-semibold text-lg text-accent">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Kelas Terjadwal</span>
                    <span className="font-semibold text-lg">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <RecentActivities />
        </div>
      </main>

      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  )
}
