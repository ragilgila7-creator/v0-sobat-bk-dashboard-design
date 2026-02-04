'use client'

import React from "react"
import { useState, useMemo } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AlertCircle, CheckCircle2, Search, ChevronDown, User, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// Sample students data organized by class
const studentsByClass: Record<string, { nis: string; nama: string }[]> = {
  'X IPA 1': [
    { nis: '2024008', nama: 'Anisa Putri' },
    { nis: '2024015', nama: 'Rafi Pratama' },
    { nis: '2024020', nama: 'Nadia Zahra' },
    { nis: '2024025', nama: 'Dimas Arya' },
  ],
  'X IPA 2': [
    { nis: '2024009', nama: 'Farhan Akbar' },
    { nis: '2024016', nama: 'Sarah Amelia' },
    { nis: '2024021', nama: 'Kevin Wijaya' },
  ],
  'X IPS 1': [
    { nis: '2024010', nama: 'Maya Sari' },
    { nis: '2024017', nama: 'Bayu Nugroho' },
    { nis: '2024022', nama: 'Putri Ayu' },
  ],
  'XI IPA 1': [
    { nis: '2024006', nama: 'Dewi Lestari' },
    { nis: '2024018', nama: 'Andi Firmansyah' },
    { nis: '2024023', nama: 'Siska Maharani' },
    { nis: '2024028', nama: 'Rizal Fadli' },
  ],
  'XI IPA 2': [
    { nis: '2024005', nama: 'Doni Hermawan' },
    { nis: '2024019', nama: 'Fitri Handayani' },
    { nis: '2024024', nama: 'Bima Sakti' },
  ],
  'XI IPS 1': [
    { nis: '2024007', nama: 'Rizky Fadillah' },
    { nis: '2024029', nama: 'Larasati Dewi' },
    { nis: '2024030', nama: 'Galih Prakoso' },
  ],
  'XII IPA 1': [
    { nis: '2024001', nama: 'Ahmad Reza Pratama' },
    { nis: '2024004', nama: 'Rina Wijaya' },
    { nis: '2024011', nama: 'Bagus Prasetyo' },
    { nis: '2024026', nama: 'Cantika Dewi' },
  ],
  'XII IPA 2': [
    { nis: '2024002', nama: 'Siti Nurhaliza' },
    { nis: '2024012', nama: 'Indah Permata' },
    { nis: '2024027', nama: 'Fajar Ramadan' },
  ],
  'XII IPS 1': [
    { nis: '2024003', nama: 'Budi Santoso' },
    { nis: '2024013', nama: 'Aditya Permana' },
    { nis: '2024014', nama: 'Mega Wulandari' },
  ],
}

const kelasList = [
  // Kelas X
  { value: 'X IPA 1', tingkat: 'Kelas X' },
  { value: 'X IPA 2', tingkat: 'Kelas X' },
  { value: 'X IPS 1', tingkat: 'Kelas X' },
  // Kelas XI
  { value: 'XI IPA 1', tingkat: 'Kelas XI' },
  { value: 'XI IPA 2', tingkat: 'Kelas XI' },
  { value: 'XI IPS 1', tingkat: 'Kelas XI' },
  // Kelas XII
  { value: 'XII IPA 1', tingkat: 'Kelas XII' },
  { value: 'XII IPA 2', tingkat: 'Kelas XII' },
  { value: 'XII IPS 1', tingkat: 'Kelas XII' },
]

const violationTypes = [
  { id: 'hadir', name: 'Tidak Hadir', points: 10 },
  { id: 'terlambat', name: 'Terlambat Masuk Kelas', points: 5 },
  { id: 'pr', name: 'Tidak Mengerjakan PR', points: 3 },
  { id: 'seragam', name: 'Seragam Tidak Sesuai', points: 2 },
  { id: 'ramai', name: 'Ramai di Kelas', points: 4 },
  { id: 'hp', name: 'Membawa HP di Kelas', points: 15 },
  { id: 'catatan', name: 'Catatan Tidak Lengkap', points: 2 },
  { id: 'lain', name: 'Lainnya', points: 0 },
]

export default function InputPelanggaranPage() {
  const [selectedKelas, setSelectedKelas] = useState<string>('')
  const [selectedStudent, setSelectedStudent] = useState<{ nis: string; nama: string } | null>(null)
  const [studentSearchOpen, setStudentSearchOpen] = useState(false)
  const [studentSearchQuery, setStudentSearchQuery] = useState('')
  
  const [formData, setFormData] = useState({
    jenisP: '',
    poin: 0,
    catatan: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [recentEntries, setRecentEntries] = useState([
    { id: 1, nama: 'Ahmad Reza Pratama', nis: '2024001', kelas: 'XII IPA 1', jenis: 'Membawa HP', poin: 15, waktu: '10 menit yang lalu' },
    { id: 2, nama: 'Siti Nurhaliza', nis: '2024002', kelas: 'XII IPA 2', jenis: 'Terlambat', poin: 5, waktu: '30 menit yang lalu' },
  ])

  // Get students for selected class
  const studentsInClass = useMemo(() => {
    if (!selectedKelas) return []
    return studentsByClass[selectedKelas] || []
  }, [selectedKelas])

  // Filter students by search query
  const filteredStudents = useMemo(() => {
    if (!studentSearchQuery) return studentsInClass
    const query = studentSearchQuery.toLowerCase()
    return studentsInClass.filter(
      s => s.nama.toLowerCase().includes(query) || s.nis.includes(query)
    )
  }, [studentsInClass, studentSearchQuery])

  const handleKelasChange = (value: string) => {
    setSelectedKelas(value)
    setSelectedStudent(null)
    setStudentSearchQuery('')
  }

  const handleStudentSelect = (student: { nis: string; nama: string }) => {
    setSelectedStudent(student)
    setStudentSearchOpen(false)
    setStudentSearchQuery('')
  }

  const handleViolationChange = (value: string) => {
    const selected = violationTypes.find(v => v.id === value)
    setFormData(prev => ({
      ...prev,
      jenisP: value,
      poin: selected?.points || 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent || !formData.jenisP) {
      alert('Mohon pilih siswa dan jenis pelanggaran')
      return
    }

    setSubmitted(true)

    // Add to recent entries
    const newEntry = {
      id: recentEntries.length + 1,
      nama: selectedStudent.nama,
      nis: selectedStudent.nis,
      kelas: selectedKelas,
      jenis: violationTypes.find(v => v.id === formData.jenisP)?.name || '',
      poin: formData.poin,
      waktu: 'Baru saja',
    }
    setRecentEntries([newEntry, ...recentEntries.slice(0, 4)])

    setTimeout(() => {
      setSelectedKelas('')
      setSelectedStudent(null)
      setFormData({
        jenisP: '',
        poin: 0,
        catatan: '',
      })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Input Pelanggaran Cepat"
        description="Catat pelanggaran siswa dengan cepat dan efisien"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Input Pelanggaran Baru</h3>
                  <p className="text-xs text-muted-foreground">Pilih kelas terlebih dahulu, lalu pilih siswa</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Pilih Kelas */}
                  <div className="space-y-2">
                    <Label className="font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                      Pilih Kelas <span className="text-destructive">*</span>
                    </Label>
                    <Select value={selectedKelas} onValueChange={handleKelasChange}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Pilih kelas terlebih dahulu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-primary font-semibold">Kelas X</SelectLabel>
                          {kelasList.filter(k => k.tingkat === 'Kelas X').map(k => (
                            <SelectItem key={k.value} value={k.value}>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {k.value}
                                <span className="text-xs text-muted-foreground">
                                  ({studentsByClass[k.value]?.length || 0} siswa)
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel className="text-secondary font-semibold">Kelas XI</SelectLabel>
                          {kelasList.filter(k => k.tingkat === 'Kelas XI').map(k => (
                            <SelectItem key={k.value} value={k.value}>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {k.value}
                                <span className="text-xs text-muted-foreground">
                                  ({studentsByClass[k.value]?.length || 0} siswa)
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel className="text-accent font-semibold">Kelas XII</SelectLabel>
                          {kelasList.filter(k => k.tingkat === 'Kelas XII').map(k => (
                            <SelectItem key={k.value} value={k.value}>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {k.value}
                                <span className="text-xs text-muted-foreground">
                                  ({studentsByClass[k.value]?.length || 0} siswa)
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Step 2: Pilih Siswa with Search */}
                  <div className="space-y-2">
                    <Label className="font-semibold flex items-center gap-2">
                      <span className={cn(
                        "w-6 h-6 rounded-full text-xs flex items-center justify-center",
                        selectedKelas ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>2</span>
                      Pilih Siswa <span className="text-destructive">*</span>
                    </Label>
                    
                    <Popover open={studentSearchOpen} onOpenChange={setStudentSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={studentSearchOpen}
                          className={cn(
                            "w-full justify-between bg-background border-border h-auto py-3",
                            !selectedKelas && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={!selectedKelas}
                        >
                          {selectedStudent ? (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-foreground">{selectedStudent.nama}</p>
                                <p className="text-xs text-muted-foreground">NIS: {selectedStudent.nis}</p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              {selectedKelas ? 'Cari dan pilih siswa...' : 'Pilih kelas terlebih dahulu'}
                            </span>
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <div className="flex items-center border-b border-border px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                            <input
                              placeholder="Cari nama atau NIS..."
                              value={studentSearchQuery}
                              onChange={(e) => setStudentSearchQuery(e.target.value)}
                              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                            />
                          </div>
                          <CommandList>
                            <CommandEmpty>
                              <div className="py-6 text-center text-sm text-muted-foreground">
                                Siswa tidak ditemukan
                              </div>
                            </CommandEmpty>
                            <CommandGroup heading={`Siswa ${selectedKelas} (${filteredStudents.length})`}>
                              {filteredStudents.map((student) => (
                                <CommandItem
                                  key={student.nis}
                                  value={student.nis}
                                  onSelect={() => handleStudentSelect(student)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center gap-3 py-1">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                      <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-foreground">{student.nama}</p>
                                      <p className="text-xs text-muted-foreground">NIS: {student.nis}</p>
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {selectedKelas && studentsInClass.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {studentsInClass.length} siswa di kelas {selectedKelas}
                      </p>
                    )}
                  </div>

                  {/* Step 3: Jenis Pelanggaran */}
                  <div className="space-y-2">
                    <Label className="font-semibold flex items-center gap-2">
                      <span className={cn(
                        "w-6 h-6 rounded-full text-xs flex items-center justify-center",
                        selectedStudent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>3</span>
                      Jenis Pelanggaran <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.jenisP} onValueChange={handleViolationChange}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Pilih jenis pelanggaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {violationTypes.map(v => (
                          <SelectItem key={v.id} value={v.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{v.name}</span>
                              <span className={cn(
                                "ml-2 px-2 py-0.5 rounded text-xs font-semibold",
                                v.points >= 10 ? "bg-destructive/10 text-destructive" :
                                v.points >= 5 ? "bg-amber-100 text-amber-700" :
                                "bg-muted text-muted-foreground"
                              )}>
                                {v.points} poin
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Poin */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Poin Pelanggaran (Otomatis)</p>
                    <p className="text-3xl font-bold text-primary">{formData.poin} Poin</p>
                  </div>

                  {/* Catatan */}
                  <div className="space-y-2">
                    <Label htmlFor="catatan" className="font-semibold">
                      Catatan Tambahan (Opsional)
                    </Label>
                    <Input
                      id="catatan"
                      placeholder="Tambahkan keterangan jika diperlukan"
                      value={formData.catatan}
                      onChange={(e) => setFormData(prev => ({ ...prev, catatan: e.target.value }))}
                      className="bg-background border-border"
                    />
                  </div>

                  {/* Summary before submit */}
                  {selectedStudent && formData.jenisP && (
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-2">Ringkasan Pelanggaran:</p>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-medium">Siswa:</span> {selectedStudent.nama} ({selectedStudent.nis})</p>
                        <p className="text-sm"><span className="font-medium">Kelas:</span> {selectedKelas}</p>
                        <p className="text-sm"><span className="font-medium">Pelanggaran:</span> {violationTypes.find(v => v.id === formData.jenisP)?.name}</p>
                        <p className="text-sm"><span className="font-medium">Poin:</span> <span className="text-destructive font-bold">{formData.poin}</span></p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                    disabled={!selectedStudent || !formData.jenisP}
                  >
                    Simpan Pelanggaran
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Pelanggaran Tersimpan!</h3>
                  <p className="text-muted-foreground">Data berhasil ditambahkan ke sistem</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Entries */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">Entri Terbaru</h3>
              <div className="space-y-3">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <p className="font-semibold text-foreground text-sm">{entry.nama}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.nis} - {entry.kelas}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded font-medium">
                        {entry.jenis}
                      </span>
                      <span className="text-sm font-bold text-primary">{entry.poin}p</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{entry.waktu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm mt-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Statistik Hari Ini</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Pelanggaran</span>
                  <span className="font-bold text-foreground">{recentEntries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Poin</span>
                  <span className="font-bold text-destructive">{recentEntries.reduce((sum, e) => sum + e.poin, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
