'use client'

import React from "react"
import { useState, useRef } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Search, Upload, FileSpreadsheet, Download, Users, Filter, AlertTriangle } from 'lucide-react'

// Sample data with more students across different grades
const initialStudents = [
  { id: 1, nis: '2024001', nama: 'Ahmad Reza Pratama', kelas: 'XII IPA 1', tingkat: '12', tahunAjaran: '2024/2025' },
  { id: 2, nis: '2024002', nama: 'Siti Nurhaliza', kelas: 'XII IPA 2', tingkat: '12', tahunAjaran: '2024/2025' },
  { id: 3, nis: '2024003', nama: 'Budi Santoso', kelas: 'XII IPS 1', tingkat: '12', tahunAjaran: '2024/2025' },
  { id: 4, nis: '2024004', nama: 'Rina Wijaya', kelas: 'XII IPA 1', tingkat: '12', tahunAjaran: '2024/2025' },
  { id: 5, nis: '2024005', nama: 'Doni Hermawan', kelas: 'XI IPA 2', tingkat: '11', tahunAjaran: '2024/2025' },
  { id: 6, nis: '2024006', nama: 'Dewi Lestari', kelas: 'XI IPA 1', tingkat: '11', tahunAjaran: '2024/2025' },
  { id: 7, nis: '2024007', nama: 'Rizky Fadillah', kelas: 'XI IPS 1', tingkat: '11', tahunAjaran: '2024/2025' },
  { id: 8, nis: '2024008', nama: 'Anisa Putri', kelas: 'X IPA 1', tingkat: '10', tahunAjaran: '2024/2025' },
  { id: 9, nis: '2024009', nama: 'Farhan Akbar', kelas: 'X IPA 2', tingkat: '10', tahunAjaran: '2024/2025' },
  { id: 10, nis: '2024010', nama: 'Maya Sari', kelas: 'X IPS 1', tingkat: '10', tahunAjaran: '2024/2025' },
  { id: 11, nis: '2023001', nama: 'Bagus Prasetyo', kelas: 'XII IPA 1', tingkat: '12', tahunAjaran: '2023/2024' },
  { id: 12, nis: '2023002', nama: 'Indah Permata', kelas: 'XI IPA 1', tingkat: '11', tahunAjaran: '2023/2024' },
]

const kelasList = [
  // Kelas X
  { value: 'X IPA 1', tingkat: '10' },
  { value: 'X IPA 2', tingkat: '10' },
  { value: 'X IPS 1', tingkat: '10' },
  { value: 'X IPS 2', tingkat: '10' },
  // Kelas XI
  { value: 'XI IPA 1', tingkat: '11' },
  { value: 'XI IPA 2', tingkat: '11' },
  { value: 'XI IPS 1', tingkat: '11' },
  { value: 'XI IPS 2', tingkat: '11' },
  // Kelas XII
  { value: 'XII IPA 1', tingkat: '12' },
  { value: 'XII IPA 2', tingkat: '12' },
  { value: 'XII IPS 1', tingkat: '12' },
  { value: 'XII IPS 2', tingkat: '12' },
]

const tahunAjaranList = ['2024/2025', '2023/2024', '2022/2023']

export default function DatabaseSiswaPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<'manual' | 'excel'>('excel')
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [filterTingkat, setFilterTingkat] = useState<string>('all')
  const [filterTahunAjaran, setFilterTahunAjaran] = useState<string>('all')
  const [bulkDeleteType, setBulkDeleteType] = useState<'tingkat' | 'tahun'>('tingkat')
  const [bulkDeleteValue, setBulkDeleteValue] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state for manual input
  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    kelas: '',
    tahunAjaran: '2024/2025'
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ]
      if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
        setUploadedFile(file)
      } else {
        alert('Format file tidak valid. Silakan upload file Excel (.xlsx, .xls) atau CSV (.csv)')
      }
    }
  }

  const handleDownloadTemplate = () => {
    const csvContent = `NIS,Nama Siswa,Kelas,Tingkat,Tahun Ajaran
2024001,Contoh Siswa Kelas X,X IPA 1,10,2024/2025
2024002,Contoh Siswa Kelas XI,XI IPA 1,11,2024/2025
2024003,Contoh Siswa Kelas XII,XII IPA 1,12,2024/2025`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template_siswa_kelas_10_11_12.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDeleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    setSelectedStudents(prev => prev.filter(sId => sId !== id))
  }

  const handleBulkDelete = () => {
    if (!bulkDeleteValue) return

    if (bulkDeleteType === 'tingkat') {
      setStudents(prev => prev.filter(s => s.tingkat !== bulkDeleteValue))
    } else {
      setStudents(prev => prev.filter(s => s.tahunAjaran !== bulkDeleteValue))
    }
    setSelectedStudents([])
    setIsBulkDeleteOpen(false)
    setBulkDeleteValue('')
  }

  const handleDeleteSelected = () => {
    setStudents(prev => prev.filter(s => !selectedStudents.includes(s.id)))
    setSelectedStudents([])
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, id])
    } else {
      setSelectedStudents(prev => prev.filter(sId => sId !== id))
    }
  }

  const handleAddManual = () => {
    if (!formData.nis || !formData.nama || !formData.kelas) {
      alert('Mohon isi semua field yang diperlukan')
      return
    }
    const selectedKelas = kelasList.find(k => k.value === formData.kelas)
    const newStudent = {
      id: Math.max(...students.map(s => s.id)) + 1,
      nis: formData.nis,
      nama: formData.nama,
      kelas: formData.kelas,
      tingkat: selectedKelas?.tingkat || '10',
      tahunAjaran: formData.tahunAjaran
    }
    setStudents(prev => [...prev, newStudent])
    setFormData({ nis: '', nama: '', kelas: '', tahunAjaran: '2024/2025' })
    setIsAddDialogOpen(false)
  }

  const handleUploadExcel = () => {
    if (!uploadedFile) {
      alert('Pilih file Excel terlebih dahulu')
      return
    }
    // Simulate upload - in real app, this would parse the Excel file
    alert(`File "${uploadedFile.name}" berhasil diupload! Data siswa akan diproses.`)
    setUploadedFile(null)
    setIsAddDialogOpen(false)
  }

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || s.nis.includes(searchQuery)
    const matchesTingkat = filterTingkat === 'all' || s.tingkat === filterTingkat
    const matchesTahun = filterTahunAjaran === 'all' || s.tahunAjaran === filterTahunAjaran
    return matchesSearch && matchesTingkat && matchesTahun
  })

  // Stats
  const totalByTingkat = {
    '10': students.filter(s => s.tingkat === '10').length,
    '11': students.filter(s => s.tingkat === '11').length,
    '12': students.filter(s => s.tingkat === '12').length,
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Database Siswa"
        description="Kelola data siswa dan informasi kontak"
      >
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Siswa</p>
                  <p className="text-xl font-bold text-foreground">{students.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground">Kelas X</p>
              <p className="text-xl font-bold text-primary mt-1">{totalByTingkat['10']}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground">Kelas XI</p>
              <p className="text-xl font-bold text-secondary mt-1">{totalByTingkat['11']}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground">Kelas XII</p>
              <p className="text-xl font-bold text-accent mt-1">{totalByTingkat['12']}</p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama atau NIS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {/* Filter Tingkat */}
              <Select value={filterTingkat} onValueChange={setFilterTingkat}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tingkat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tingkat</SelectItem>
                  <SelectItem value="10">Kelas X</SelectItem>
                  <SelectItem value="11">Kelas XI</SelectItem>
                  <SelectItem value="12">Kelas XII</SelectItem>
                </SelectContent>
              </Select>
              {/* Filter Tahun Ajaran */}
              <Select value={filterTahunAjaran} onValueChange={setFilterTahunAjaran}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Tahun Ajaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  {tahunAjaranList.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              {/* Bulk Delete Button */}
              {selectedStudents.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Hapus ({selectedStudents.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Siswa Terpilih?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Anda akan menghapus {selectedStudents.length} siswa yang dipilih. Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {/* Bulk Delete by Grade/Year */}
              <Dialog open={isBulkDeleteOpen} onOpenChange={setIsBulkDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent border-destructive/50 text-destructive hover:bg-destructive/10">
                    <AlertTriangle className="w-4 h-4" />
                    Hapus Massal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hapus Siswa Massal</DialogTitle>
                    <DialogDescription>
                      Hapus semua siswa berdasarkan tingkat kelas atau tahun ajaran
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Hapus Berdasarkan</Label>
                      <Select value={bulkDeleteType} onValueChange={(v: 'tingkat' | 'tahun') => {
                        setBulkDeleteType(v)
                        setBulkDeleteValue('')
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tingkat">Tingkat Kelas</SelectItem>
                          <SelectItem value="tahun">Tahun Ajaran</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{bulkDeleteType === 'tingkat' ? 'Pilih Tingkat' : 'Pilih Tahun Ajaran'}</Label>
                      <Select value={bulkDeleteValue} onValueChange={setBulkDeleteValue}>
                        <SelectTrigger>
                          <SelectValue placeholder={bulkDeleteType === 'tingkat' ? 'Pilih tingkat...' : 'Pilih tahun...'} />
                        </SelectTrigger>
                        <SelectContent>
                          {bulkDeleteType === 'tingkat' ? (
                            <>
                              <SelectItem value="10">Kelas X ({totalByTingkat['10']} siswa)</SelectItem>
                              <SelectItem value="11">Kelas XI ({totalByTingkat['11']} siswa)</SelectItem>
                              <SelectItem value="12">Kelas XII ({totalByTingkat['12']} siswa)</SelectItem>
                            </>
                          ) : (
                            tahunAjaranList.map(t => (
                              <SelectItem key={t} value={t}>
                                {t} ({students.filter(s => s.tahunAjaran === t).length} siswa)
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    {bulkDeleteValue && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {bulkDeleteType === 'tingkat' 
                            ? `${students.filter(s => s.tingkat === bulkDeleteValue).length} siswa akan dihapus`
                            : `${students.filter(s => s.tahunAjaran === bulkDeleteValue).length} siswa akan dihapus`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsBulkDeleteOpen(false)}>Batal</Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleBulkDelete}
                      disabled={!bulkDeleteValue}
                    >
                      Hapus Semua
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Add Student Dialog */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Siswa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tambah Siswa</DialogTitle>
                    <DialogDescription>
                      Upload file Excel untuk menambah siswa secara massal atau input manual
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Tab Selection */}
                  <div className="flex gap-2 border-b border-border pb-4">
                    <Button 
                      variant={activeTab === 'manual' ? 'default' : 'outline'} 
                      className={`flex-1 gap-2 ${activeTab === 'manual' ? 'bg-primary' : 'bg-transparent'}`}
                      onClick={() => setActiveTab('manual')}
                    >
                      <Plus className="w-4 h-4" />
                      Input Manual
                    </Button>
                    <Button 
                      variant={activeTab === 'excel' ? 'default' : 'outline'} 
                      className={`flex-1 gap-2 ${activeTab === 'excel' ? 'bg-secondary text-secondary-foreground' : 'bg-transparent'}`}
                      onClick={() => setActiveTab('excel')}
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Upload Excel
                    </Button>
                  </div>

                  {activeTab === 'excel' ? (
                    <div className="space-y-4">
                      {/* Excel Upload Section */}
                      <div className="bg-muted/50 rounded-xl p-6 border-2 border-dashed border-border">
                        <div className="text-center space-y-4">
                          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Upload File Excel</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Format: .xlsx, .xls, .csv - Untuk Kelas X, XI, dan XII
                            </p>
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".xlsx,.xls,.csv"
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-2 bg-transparent"
                          >
                            <Upload className="w-4 h-4" />
                            Pilih File
                          </Button>
                          {uploadedFile && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                                <FileSpreadsheet className="w-4 h-4" />
                                {uploadedFile.name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                        <h4 className="font-semibold text-foreground mb-2">Format Template Excel</h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          File Excel harus memiliki kolom berikut:
                        </p>
                        <div className="grid grid-cols-5 gap-2 text-xs">
                          <div className="bg-background p-2 rounded text-center font-medium">NIS</div>
                          <div className="bg-background p-2 rounded text-center font-medium">Nama Siswa</div>
                          <div className="bg-background p-2 rounded text-center font-medium">Kelas</div>
                          <div className="bg-background p-2 rounded text-center font-medium">Tingkat</div>
                          <div className="bg-background p-2 rounded text-center font-medium">Tahun Ajaran</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Tingkat: 10, 11, atau 12 | Contoh Kelas: X IPA 1, XI IPS 2, XII IPA 1
                        </p>
                      </div>

                      {/* Download Template */}
                      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium text-foreground">Download Template</p>
                          <p className="text-xs text-muted-foreground">Template untuk Kelas X, XI, XII</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleDownloadTemplate} className="gap-2 bg-transparent">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-transparent">
                          Batal
                        </Button>
                        <Button 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleUploadExcel}
                          disabled={!uploadedFile}
                        >
                          Upload & Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Manual Input Form */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nis">NIS <span className="text-destructive">*</span></Label>
                          <Input 
                            id="nis" 
                            placeholder="Masukkan NIS" 
                            value={formData.nis}
                            onChange={(e) => setFormData(prev => ({ ...prev, nis: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nama">Nama Siswa <span className="text-destructive">*</span></Label>
                          <Input 
                            id="nama" 
                            placeholder="Masukkan nama lengkap"
                            value={formData.nama}
                            onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="kelas">Kelas <span className="text-destructive">*</span></Label>
                          <Select value={formData.kelas} onValueChange={(v) => setFormData(prev => ({ ...prev, kelas: v }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kelas" />
                            </SelectTrigger>
                            <SelectContent>
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Kelas X</div>
                              {kelasList.filter(k => k.tingkat === '10').map(k => (
                                <SelectItem key={k.value} value={k.value}>{k.value}</SelectItem>
                              ))}
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Kelas XI</div>
                              {kelasList.filter(k => k.tingkat === '11').map(k => (
                                <SelectItem key={k.value} value={k.value}>{k.value}</SelectItem>
                              ))}
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Kelas XII</div>
                              {kelasList.filter(k => k.tingkat === '12').map(k => (
                                <SelectItem key={k.value} value={k.value}>{k.value}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tahun">Tahun Ajaran</Label>
                          <Select value={formData.tahunAjaran} onValueChange={(v) => setFormData(prev => ({ ...prev, tahunAjaran: v }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tahun ajaran" />
                            </SelectTrigger>
                            <SelectContent>
                              {tahunAjaranList.map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-transparent">
                          Batal
                        </Button>
                        <Button 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleAddManual}
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">NIS</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Siswa</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Kelas</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Tingkat</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Tahun Ajaran</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Tidak ada data siswa yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <Checkbox 
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">{student.nis}</TableCell>
                        <TableCell className="text-foreground">{student.nama}</TableCell>
                        <TableCell className="text-muted-foreground">{student.kelas}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.tingkat === '10' ? 'bg-primary/10 text-primary' :
                            student.tingkat === '11' ? 'bg-secondary/10 text-secondary' :
                            'bg-accent/10 text-accent'
                          }`}>
                            Kelas {student.tingkat === '10' ? 'X' : student.tingkat === '11' ? 'XI' : 'XII'}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{student.tahunAjaran}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus Siswa?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Anda akan menghapus data siswa <strong>{student.nama}</strong> ({student.nis}). Tindakan ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteStudent(student.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Info Footer */}
          <div className="text-sm text-muted-foreground">
            Menampilkan {filteredStudents.length} dari {students.length} siswa
            {selectedStudents.length > 0 && ` | ${selectedStudents.length} siswa dipilih`}
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
