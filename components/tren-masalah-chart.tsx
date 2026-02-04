'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Define distinct colors for each category
const COLORS = {
  Belajar: '#3b82f6',   // Blue
  Pribadi: '#10b981',   // Emerald/Teal
  Sosial: '#f59e0b',    // Amber/Orange
  Karir: '#8b5cf6',     // Purple
}

const data = [
  {
    bulan: 'Januari',
    Belajar: 24,
    Pribadi: 19,
    Sosial: 29,
    Karir: 12,
  },
  {
    bulan: 'Februari',
    Belajar: 28,
    Pribadi: 22,
    Sosial: 32,
    Karir: 15,
  },
  {
    bulan: 'Maret',
    Belajar: 21,
    Pribadi: 18,
    Sosial: 27,
    Karir: 13,
  },
  {
    bulan: 'April',
    Belajar: 32,
    Pribadi: 25,
    Sosial: 35,
    Karir: 18,
  },
  {
    bulan: 'Mei',
    Belajar: 27,
    Pribadi: 20,
    Sosial: 31,
    Karir: 16,
  },
  {
    bulan: 'Juni',
    Belajar: 24,
    Pribadi: 21,
    Sosial: 28,
    Karir: 14,
  },
]

export function TrenMasalahChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Tren Masalah Siswa</h3>
        <p className="text-sm text-muted-foreground">Kategori masalah yang dialami siswa dalam 6 bulan terakhir</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="bulan"
            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend
            wrapperStyle={{ color: 'var(--color-foreground)' }}
          />
          <Bar dataKey="Belajar" fill={COLORS.Belajar} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Pribadi" fill={COLORS.Pribadi} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Sosial" fill={COLORS.Sosial} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Karir" fill={COLORS.Karir} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
