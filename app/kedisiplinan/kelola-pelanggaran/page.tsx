'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { PageLayout } from '@/components/page-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react'

interface ViolationType {
  id: number
  nama: string
  kategori: string
  poin: number
  deskripsi: string
}

const initialViolationTypes: ViolationType[] = [
  { id: 1, nama: 'Membawa HP', kategori: 'Berat', poin: 15, deskripsi: 'Membawa handphone ke sekolah tanpa izin' },
  { id: 2, nama: 'Terlambat', kategori: 'Ringan', poin: 5, deskripsi: 'Datang terlambat ke sekolah' },
  { id: 3, nama: 'Tidak Mengerjakan PR', kategori: 'Sedang', poin: 8, deskripsi: 'Tidak mengerjakan pekerjaan rumah' },
  { id: 4, nama: 'Ramai di Kelas', kategori: 'Ringan', poin: 3, deskripsi: 'Membuat keributan di dalam kelas' },
  { id: 5, nama: 'Tidak Hadir Tanpa Keterangan', kategori: 'Berat', poin: 10, deskripsi: 'Alpha atau tidak hadir tanpa surat keterangan' },
  { id: 6, nama: 'Seragam Tidak Lengkap', kategori: 'Ringan', poin: 5, deskripsi: 'Tidak memakai seragam sesuai ketentuan' },
  { id: 7, nama: 'Merokok', kategori: 'Berat', poin: 25, deskripsi: 'Merokok di lingkungan sekolah' },
  { id: 8, nama: 'Berkelahi', kategori: 'Berat', poin: 30, deskripsi: 'Terlibat perkelahian fisik' },
  { id: 9, nama: 'Bolos', kategori: 'Berat', poin: 15, deskripsi: 'Meninggalkan sekolah tanpa izin' },
  { id: 10, nama: 'Rambut Panjang (Putra)', kategori: 'Sedang', poin: 5, deskripsi: 'Rambut melebihi batas ketentuan untuk siswa putra' },
]

function getKategoriBadgeColor(kategori: string) {
  switch (kategori) {
    case 'Ringan':
      return 'bg-green-100 text-green-700'
    case 'Sedang':
      return 'bg-yellow-100 text-yellow-700'
    case 'Berat':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function KelolaJenisPelanggaranPage() {
  const [violationTypes, setViolationTypes] = useState<ViolationType[]>(initialViolationTypes)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<ViolationType | null>(null)
  
  // Form state for new violation
  const [newViolation, setNewViolation] = useState({
    nama: '',
    kategori: '',
    poin: '',
    deskripsi: ''
  })

  const filtered = violationTypes.filter(
    v => v.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
         v.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (violation: ViolationType) => {
    setEditingId(violation.id)
    setEditForm({ ...violation })
  }

  const handleSaveEdit = () => {
    if (editForm) {
      setViolationTypes(prev => 
        prev.map(v => v.id === editForm.id ? editForm : v)
      )
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus jenis pelanggaran ini?')) {
      setViolationTypes(prev => prev.filter(v => v.id !== id))
    }
  }

  const handleAddViolation = () => {
    if (newViolation.nama && newViolation.kategori && newViolation.poin) {
      const newId = Math.max(...violationTypes.map(v => v.id)) + 1
      setViolationTypes(prev => [...prev, {
        id: newId,
        nama: newViolation.nama,
        kategori: newViolation.kategori,
        poin: parseInt(newViolation.poin),
        deskripsi: newViolation.deskripsi
      }])
      setNewViolation({ nama: '', kategori: '', poin: '', deskripsi: '' })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <PageLayout
        title="Kelola Jenis Pelanggaran"
        description="Edit dan atur jenis pelanggaran beserta poin-nya"
      >
        <div className="space-y-6">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari jenis pelanggaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Jenis Pelanggaran
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Jenis Pelanggaran Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Pelanggaran</Label>
                    <Input 
                      id="nama" 
                      placeholder="Contoh: Membawa HP"
                      value={newViolation.nama}
                      onChange={(e) => setNewViolation(prev => ({ ...prev, nama: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kategori">Kategori</Label>
                      <Select 
                        value={newViolation.kategori}
                        onValueChange={(value) => setNewViolation(prev => ({ ...prev, kategori: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ringan">Ringan</SelectItem>
                          <SelectItem value="Sedang">Sedang</SelectItem>
                          <SelectItem value="Berat">Berat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poin">Poin</Label>
                      <Input 
                        id="poin" 
                        type="number"
                        placeholder="0"
                        value={newViolation.poin}
                        onChange={(e) => setNewViolation(prev => ({ ...prev, poin: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Input 
                      id="deskripsi" 
                      placeholder="Deskripsi singkat pelanggaran"
                      value={newViolation.deskripsi}
                      onChange={(e) => setNewViolation(prev => ({ ...prev, deskripsi: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={handleAddViolation}
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Jenis</p>
              <p className="text-2xl font-bold text-primary mt-2">{violationTypes.length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Kategori Ringan</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{violationTypes.filter(v => v.kategori === 'Ringan').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Kategori Sedang</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{violationTypes.filter(v => v.kategori === 'Sedang').length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Kategori Berat</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{violationTypes.filter(v => v.kategori === 'Berat').length}</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">No</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Nama Pelanggaran</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Kategori</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Poin</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Deskripsi</TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((violation, index) => (
                    <TableRow key={violation.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                      <TableCell>
                        {editingId === violation.id ? (
                          <Input 
                            value={editForm?.nama || ''} 
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, nama: e.target.value } : null)}
                            className="max-w-[200px]"
                          />
                        ) : (
                          <span className="font-medium text-foreground">{violation.nama}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === violation.id ? (
                          <Select 
                            value={editForm?.kategori || ''} 
                            onValueChange={(value) => setEditForm(prev => prev ? { ...prev, kategori: value } : null)}
                          >
                            <SelectTrigger className="max-w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ringan">Ringan</SelectItem>
                              <SelectItem value="Sedang">Sedang</SelectItem>
                              <SelectItem value="Berat">Berat</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriBadgeColor(violation.kategori)}`}>
                            {violation.kategori}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === violation.id ? (
                          <Input 
                            type="number"
                            value={editForm?.poin || 0} 
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, poin: parseInt(e.target.value) || 0 } : null)}
                            className="max-w-[80px]"
                          />
                        ) : (
                          <span className="font-bold text-primary text-lg">{violation.poin}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === violation.id ? (
                          <Input 
                            value={editForm?.deskripsi || ''} 
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, deskripsi: e.target.value } : null)}
                            className="max-w-[250px]"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{violation.deskripsi}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {editingId === violation.id ? (
                            <>
                              <Button size="sm" variant="ghost" onClick={handleSaveEdit} className="text-green-600 hover:bg-green-100">
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="text-gray-600 hover:bg-gray-100">
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(violation)} className="text-primary hover:bg-primary/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete(violation.id)} className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Panduan Kategori Pelanggaran</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-bold text-green-700">Ringan (1-5 Poin)</p>
                <p className="text-xs text-green-600 mt-1">Pelanggaran ringan seperti terlambat, ramai di kelas</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-bold text-yellow-700">Sedang (6-14 Poin)</p>
                <p className="text-xs text-yellow-600 mt-1">Pelanggaran yang perlu pembinaan lebih lanjut</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-bold text-red-700">Berat (15+ Poin)</p>
                <p className="text-xs text-red-600 mt-1">Pelanggaran serius yang memerlukan penanganan khusus</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
