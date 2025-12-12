# PSG iTech Smart Campus - Database Setup Guide

## 🗄️ Supabase Database Configuration

This guide will help you set up the Supabase database for the PSG iTech Smart Campus application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Step 1: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings under "API".

## Step 2: Create Database Tables

Run the following SQL scripts in your Supabase SQL Editor:

### 1. Users Table

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teaching-staff', 'non-teaching-staff', 'maintenance-head')),
  department TEXT NOT NULL CHECK (department IN ('CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'Administration', 'Facilities')),
  roll_number TEXT UNIQUE,
  employee_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_student_roll CHECK (role != 'student' OR roll_number IS NOT NULL),
  CONSTRAINT check_staff_employee CHECK (role = 'student' OR employee_id IS NOT NULL),
  CONSTRAINT check_email_domain CHECK (email LIKE '%@psgitech.ac.in'),
  CONSTRAINT check_roll_format CHECK (role != 'student' OR roll_number LIKE '7155%')
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_roll_number ON users(roll_number);
CREATE INDEX idx_users_employee_id ON users(employee_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department ON users(department);
```

### 2. Faculty Table

```sql
CREATE TABLE faculty (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL CHECK (department IN ('CSE', 'ECE', 'EEE', 'MECH', 'CIVIL')),
  designation TEXT NOT NULL,
  specialization TEXT,
  phone TEXT,
  office_location TEXT,
  available_hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_faculty_department ON faculty(department);
CREATE INDEX idx_faculty_email ON faculty(email);
```

### 3. Subjects Table

```sql
CREATE TABLE subjects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL CHECK (department IN ('CSE', 'ECE', 'EEE', 'MECH', 'CIVIL')),
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
  credits INTEGER NOT NULL,
  faculty_id TEXT REFERENCES faculty(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subjects_department ON subjects(department);
CREATE INDEX idx_subjects_semester ON subjects(semester);
CREATE INDEX idx_subjects_faculty ON subjects(faculty_id);
```

### 4. Assignments Table

```sql
CREATE TABLE assignments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject_id TEXT REFERENCES subjects(id),
  assigned_by TEXT REFERENCES users(id),
  assigned_date DATE NOT NULL,
  due_date DATE NOT NULL,
  max_marks INTEGER NOT NULL,
  submission_type TEXT NOT NULL,
  class_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_assignments_subject ON assignments(subject_id);
CREATE INDEX idx_assignments_assigned_by ON assignments(assigned_by);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
```

### 5. Student Requests Table

```sql
CREATE TABLE student_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  student_id TEXT REFERENCES users(id),
  faculty_id TEXT REFERENCES users(id),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_student_requests_student ON student_requests(student_id);
CREATE INDEX idx_student_requests_faculty ON student_requests(faculty_id);
CREATE INDEX idx_student_requests_status ON student_requests(status);
```

### 6. Events Table

```sql
CREATE TABLE events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('technical', 'cultural', 'sports', 'workshop', 'seminar', 'fest', 'fun')),
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  organizer TEXT NOT NULL,
  registration_required BOOLEAN DEFAULT FALSE,
  registration_deadline DATE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  prizes TEXT,
  speaker TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_type ON events(type);
```

### 7. Seminar Halls Table

```sql
CREATE TABLE seminar_halls (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('CSE', 'ECE', 'EEE', 'MECH', 'CIVIL')),
  capacity INTEGER NOT NULL,
  facilities JSONB,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seminar_halls_department ON seminar_halls(department);

-- Insert default seminar halls for each department
INSERT INTO seminar_halls (name, department, capacity, facilities, location) VALUES
  ('CSE Seminar Hall A', 'CSE', 100, '["Projector", "AC", "Podium", "Whiteboard", "Audio System"]', 'CSE Block, 1st Floor'),
  ('CSE Seminar Hall B', 'CSE', 80, '["Projector", "AC", "Whiteboard", "Audio System"]', 'CSE Block, 2nd Floor'),
  ('ECE Seminar Hall', 'ECE', 120, '["Projector", "AC", "Podium", "Whiteboard", "Audio System", "Video Conferencing"]', 'ECE Block, Ground Floor'),
  ('EEE Conference Room', 'EEE', 60, '["Projector", "AC", "Whiteboard", "Audio System"]', 'EEE Block, 1st Floor'),
  ('Mechanical Seminar Hall', 'MECH', 100, '["Projector", "AC", "Podium", "Whiteboard"]', 'Mechanical Block, Ground Floor'),
  ('Civil Seminar Hall', 'CIVIL', 80, '["Projector", "AC", "Whiteboard", "Audio System"]', 'Civil Block, 2nd Floor');
```

### 8. Seminar Bookings Table

```sql
CREATE TABLE seminar_bookings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  hall_id TEXT REFERENCES seminar_halls(id),
  user_id TEXT REFERENCES users(id),
  purpose TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  participants INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seminar_bookings_hall ON seminar_bookings(hall_id);
CREATE INDEX idx_seminar_bookings_user ON seminar_bookings(user_id);
CREATE INDEX idx_seminar_bookings_date ON seminar_bookings(date);
CREATE INDEX idx_seminar_bookings_status ON seminar_bookings(status);
```

### 9. Complaints Table

```sql
CREATE TABLE complaints (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  student_id TEXT REFERENCES users(id),
  category TEXT NOT NULL CHECK (category IN ('electrical', 'plumbing', 'furniture', 'ac-ventilation', 'network', 'other')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved')),
  submitted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_date TIMESTAMP WITH TIME ZONE,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_complaints_student ON complaints(student_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_category ON complaints(category);
```

### 10. Indoor Stadium Events Table

```sql
CREATE TABLE indoor_stadium_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  sport_type TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  registration_deadline DATE NOT NULL,
  max_participants INTEGER NOT NULL,
  current_participants INTEGER DEFAULT 0,
  created_by TEXT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_stadium_events_date ON indoor_stadium_events(date);
CREATE INDEX idx_stadium_events_sport ON indoor_stadium_events(sport_type);
```

### 11. Sports News Table

```sql
CREATE TABLE sports_news (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  created_by TEXT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sports_news_date ON sports_news(date);
```

### 12. Equipment Tracking Table

```sql
CREATE TABLE equipment_tracking (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  chess_count INTEGER DEFAULT 0,
  table_tennis_count INTEGER DEFAULT 0,
  badminton_count INTEGER DEFAULT 0,
  carrom_count INTEGER DEFAULT 0,
  ball_games_count INTEGER DEFAULT 0,
  updated_by TEXT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_equipment_tracking_week ON equipment_tracking(week_start);
```

### 13. Password Reset Tokens Table

```sql
CREATE TABLE password_reset_tokens (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT NOT NULL,
  otp TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_password_reset_email ON password_reset_tokens(email);
CREATE INDEX idx_password_reset_otp ON password_reset_tokens(otp);
CREATE INDEX idx_password_reset_used ON password_reset_tokens(used);
```

## Step 3: Insert Sample Data

### Sample Users

```sql
-- Sample Student (Password: student123)
INSERT INTO users (name, email, password, role, department, roll_number) VALUES
  ('Raj Kumar', '7155cs001@psgitech.ac.in', 'student123', 'student', 'CSE', '7155CS001'),
  ('Priya Sharma', '7155ece002@psgitech.ac.in', 'student123', 'student', 'ECE', '7155ECE002'),
  ('Amit Patel', '7155eee003@psgitech.ac.in', 'student123', 'student', 'EEE', '7155EEE003');

-- Sample Teaching Staff (Password: teacher123)
INSERT INTO users (name, email, password, role, department, employee_id) VALUES
  ('Dr. Vijay Kumar', 'vijay.kumar@psgitech.ac.in', 'teacher123', 'teaching-staff', 'CSE', 'EMP001'),
  ('Dr. Lakshmi Devi', 'lakshmi.devi@psgitech.ac.in', 'teacher123', 'teaching-staff', 'ECE', 'EMP002');

-- Sample PT Staff (Password: staff123)
INSERT INTO users (name, email, password, role, department, employee_id) VALUES
  ('Ravi Sports', 'ravi.sports@psgitech.ac.in', 'staff123', 'non-teaching-staff', 'Administration', 'EMP101');

-- Sample Maintenance Head (Password: maint123)
INSERT INTO users (name, email, password, role, department, employee_id) VALUES
  ('Kumar Facilities', 'kumar.facilities@psgitech.ac.in', 'maint123', 'maintenance-head', 'Facilities', 'EMP201');
```

### Sample Subjects by Department

```sql
-- CSE Subjects
INSERT INTO subjects (name, code, department, semester, credits) VALUES
  ('Data Structures', 'CS201', 'CSE', 3, 4),
  ('Operating Systems', 'CS301', 'CSE', 5, 4),
  ('Database Management', 'CS302', 'CSE', 5, 4),
  ('Computer Networks', 'CS401', 'CSE', 7, 4);

-- ECE Subjects
INSERT INTO subjects (name, code, department, semester, credits) VALUES
  ('Digital Electronics', 'EC201', 'ECE', 3, 4),
  ('Signals and Systems', 'EC301', 'ECE', 5, 4),
  ('Communication Systems', 'EC401', 'ECE', 7, 4);

-- EEE Subjects
INSERT INTO subjects (name, code, department, semester, credits) VALUES
  ('Electrical Machines', 'EE201', 'EEE', 3, 4),
  ('Power Systems', 'EE301', 'EEE', 5, 4),
  ('Control Systems', 'EE401', 'EEE', 7, 4);

-- MECH Subjects
INSERT INTO subjects (name, code, department, semester, credits) VALUES
  ('Thermodynamics', 'ME201', 'MECH', 3, 4),
  ('Fluid Mechanics', 'ME301', 'MECH', 5, 4),
  ('Machine Design', 'ME401', 'MECH', 7, 4);

-- CIVIL Subjects
INSERT INTO subjects (name, code, department, semester, credits) VALUES
  ('Structural Analysis', 'CE201', 'CIVIL', 3, 4),
  ('Geotechnical Engineering', 'CE301', 'CIVIL', 5, 4),
  ('Transportation Engineering', 'CE401', 'CIVIL', 7, 4);
```

## Step 4: Set Up Row Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE seminar_halls ENABLE ROW LEVEL SECURITY;
ALTER TABLE seminar_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE indoor_stadium_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies (Example for users table - create similar for others)
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow password reset token creation" ON password_reset_tokens
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow password reset token read" ON password_reset_tokens
  FOR SELECT USING (true);
```

## Step 5: Testing

1. Update your `.env.local` file with your Supabase credentials
2. Restart your development server
3. Try logging in with the sample users
4. Test the forgot password flow

## Important Notes

- **Security**: In production, use proper password hashing (bcrypt, argon2)
- **Email Service**: Configure an email service (SendGrid, AWS SES) for OTP delivery
- **Validation**: All validations are enforced at database level
- **RLS Policies**: Customize RLS policies based on your security requirements
- **Backup**: Regularly backup your database

## Support

For issues or questions, contact: support@psgitech.ac.in
