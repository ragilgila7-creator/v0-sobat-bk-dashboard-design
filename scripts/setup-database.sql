-- SobatBK Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nis VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class VARCHAR(50) NOT NULL,
  gender VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(255),
  parent_name VARCHAR(255),
  parent_phone VARCHAR(20),
  address TEXT,
  violation_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Violation types
CREATE TABLE violation_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  points INTEGER NOT NULL,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Violations (Pelanggaran)
CREATE TABLE violations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  violation_type_id UUID NOT NULL REFERENCES violation_types(id),
  date DATE NOT NULL,
  points INTEGER NOT NULL,
  evidence_url VARCHAR(500),
  notes TEXT,
  recorded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Counseling sessions (Sesi Konseling)
CREATE TABLE counseling_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  session_type VARCHAR(50), -- 'individual', 'group', 'classroom'
  title VARCHAR(255),
  description TEXT,
  problem_category VARCHAR(100), -- 'belajar', 'pribadi', 'sosial', 'karir'
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  counselor_id UUID,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'ongoing', -- 'ongoing', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Group counseling sessions
CREATE TABLE group_counseling_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  problem_category VARCHAR(100),
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  counselor_id UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Group counseling participants
CREATE TABLE group_counseling_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_session_id UUID NOT NULL REFERENCES group_counseling_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_session_id, student_id)
);

-- Classroom guidance (Bimbingan Klasikal)
CREATE TABLE classroom_guidance_rpl (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  counselor_id UUID,
  notes TEXT,
  material_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Home visits (Home Visit)
CREATE TABLE home_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  visit_date DATE NOT NULL,
  purpose TEXT NOT NULL,
  findings TEXT,
  recommendations TEXT,
  counselor_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Monthly reports
CREATE TABLE monthly_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  total_students INTEGER,
  total_counseling_sessions INTEGER,
  total_violations INTEGER,
  summary TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Activities log
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  activity_type VARCHAR(100),
  description TEXT,
  related_student_id UUID REFERENCES students(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_students_nis ON students(nis);
CREATE INDEX idx_students_class ON students(class);
CREATE INDEX idx_violations_student_id ON violations(student_id);
CREATE INDEX idx_violations_date ON violations(date);
CREATE INDEX idx_counseling_sessions_student_id ON counseling_sessions(student_id);
CREATE INDEX idx_counseling_sessions_status ON counseling_sessions(status);
CREATE INDEX idx_group_counseling_participants_student_id ON group_counseling_participants(student_id);
CREATE INDEX idx_activities_created_at ON activities(created_at);

-- Insert default violation types
INSERT INTO violation_types (name, points, category, description) VALUES
('Terlambat', 1, 'Kedisiplinan', 'Siswa terlambat masuk kelas'),
('Tidak Mengerjakan PR', 2, 'Akademik', 'Tidak mengerjakan pekerjaan rumah'),
('Tidak Hadir Tanpa Keterangan', 3, 'Kedisiplinan', 'Absen tanpa surat keterangan'),
('Menyontek', 5, 'Akademik', 'Melakukan kecurangan saat ujian'),
('Membawa HP ke Sekolah', 2, 'Kedisiplinan', 'Membawa perangkat elektronik terlarang'),
('Berpakaian Tidak Sesuai', 1, 'Kedisiplinan', 'Seragam atau penampilan tidak sesuai ketentuan'),
('Berbuat Gaduh di Kelas', 2, 'Perilaku', 'Mengganggu proses pembelajaran'),
('Perkelahian', 10, 'Perilaku', 'Terlibat perkelahian dengan siswa lain'),
('Tidak Sopan ke Guru', 5, 'Perilaku', 'Berbicara tidak sopan kepada guru'),
('Membolos', 5, 'Kedisiplinan', 'Tidak masuk kelas tanpa izin');
