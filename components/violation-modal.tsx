'use client'

import React from "react"

import { useState } from 'react'
import { X, Upload, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ViolationModalProps {
  isOpen: boolean
  onClose: () => void
}

const violationTypes = [
  { id: 'hadir', name: 'Tidak Hadir', defaultPoints: 10 },
  { id: 'terlambat', name: 'Terlambat Masuk Kelas', defaultPoints: 5 },
  { id: 'pr', name: 'Tidak Mengerjakan PR', defaultPoints: 3 },
  { id: 'seragam', name: 'Seragam Tidak Sesuai', defaultPoints: 2 },
  { id: 'ramai', name: 'Ramai di Kelas', defaultPoints: 4 },
  { id: 'hp', name: 'Membawa HP di Kelas', defaultPoints: 15 },
  { id: 'catatan', name: 'Catatan Tidak Lengkap', defaultPoints: 2 },
  { id: 'lain', name: 'Lainnya', defaultPoints: 0 },
]

export function ViolationModal({ isOpen, onClose }: ViolationModalProps) {
  const [formData, setFormData] = useState({
    namaSiswa: '',
    nis: '',
    jenisP: '',
    poin: 0,
    catatan: '',
    bukti: null as File | null,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleViolationChange = (value: string) => {
    const selected = violationTypes.find(v => v.id === value)
    setFormData(prev => ({
      ...prev,
      jenisP: value,
      poin: selected?.defaultPoints || 0,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, bukti: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.namaSiswa || !formData.nis || !formData.jenisP) {
      alert('Mohon isi semua field yang diperlukan')
      return
    }

    // Here you would typically send data to your backend
    console.log('[v0] Violation submitted:', formData)
    setSubmitted(true)

    setTimeout(() => {
      resetForm()
      onClose()
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      namaSiswa: '',
      nis: '',
      jenisP: '',
      poin: 0,
      catatan: '',
      bukti: null,
    })
    setSubmitted(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Input Pelanggaran</h2>
                <p className="text-xs text-muted-foreground">Catat pelanggaran siswa dengan cepat</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Nama Siswa */}
              <div className="space-y-2">
                <Label htmlFor="namaSiswa" className="text-sm font-semibold">
                  Nama Siswa <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="namaSiswa"
                  placeholder="Masukkan nama siswa"
                  value={formData.namaSiswa}
                  onChange={(e) => setFormData(prev => ({ ...prev, namaSiswa: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>

              {/* NIS */}
              <div className="space-y-2">
                <Label htmlFor="nis" className="text-sm font-semibold">
                  NIS <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nis"
                  placeholder="Nomor Induk Siswa"
                  value={formData.nis}
                  onChange={(e) => setFormData(prev => ({ ...prev, nis: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>

              {/* Jenis Pelanggaran */}
              <div className="space-y-2">
                <Label htmlFor="jenisP" className="text-sm font-semibold">
                  Jenis Pelanggaran <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.jenisP} onValueChange={handleViolationChange}>
                  <SelectTrigger id="jenisP" className="bg-background border-border">
                    <SelectValue placeholder="Pilih jenis pelanggaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {violationTypes.map(v => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name} ({v.defaultPoints} poin)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Poin (Auto-filled) */}
              <div className="space-y-2">
                <Label htmlFor="poin" className="text-sm font-semibold">
                  Poin <span className="text-muted-foreground text-xs">(Otomatis)</span>
                </Label>
                <div className="bg-muted p-3 rounded-lg border border-border">
                  <p className="text-2xl font-bold text-primary">{formData.poin} Poin</p>
                  <p className="text-xs text-muted-foreground mt-1">Poin akan terupdate otomatis berdasarkan jenis pelanggaran</p>
                </div>
              </div>

              {/* Catatan */}
              <div className="space-y-2">
                <Label htmlFor="catatan" className="text-sm font-semibold">
                  Catatan Tambahan
                </Label>
                <Input
                  id="catatan"
                  placeholder="Deskripsi pelanggaran (opsional)"
                  value={formData.catatan}
                  onChange={(e) => setFormData(prev => ({ ...prev, catatan: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="bukti" className="text-sm font-semibold">
                  Upload Bukti <span className="text-muted-foreground text-xs">(Opsional)</span>
                </Label>
                <label
                  htmlFor="bukti"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {formData.bukti ? formData.bukti.name : 'Klik untuk upload foto/dokumen'}
                    </p>
                    <p className="text-xs text-muted-foreground">Max 5MB (JPG, PNG, PDF)</p>
                  </div>
                </label>
                <input
                  id="bukti"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Simpan Pelanggaran
                </Button>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Pelanggaran Tersimpan!</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Data pelanggaran untuk {formData.namaSiswa} telah berhasil dicatat dalam sistem.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
