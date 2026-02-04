import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Student = {
  id: string
  nis: string
  nama: string
  kelas: string
  tahun_ajaran: string
  email?: string
  no_telepon?: string
  alamat?: string
  created_at: string
  updated_at: string
}

export type Violation = {
  id: string
  student_id: string
  jenis_pelanggaran: string
  poin: number
  bukti_upload_url?: string
  catatan?: string
  created_at: string
  updated_at: string
}

export type CounselingSession = {
  id: string
  student_id: string
  jenis_layanan: string
  tanggal: string
  topik: string
  hasil: string
  catatan?: string
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  tipe: string
  student_id: string
  deskripsi: string
  created_at: string
}
