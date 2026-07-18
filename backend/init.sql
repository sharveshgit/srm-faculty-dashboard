-- ============ USERS TABLE ============
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT CHECK (role IN ('faculty', 'hod')) DEFAULT 'faculty',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============ FACULTY TABLE ============
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  department TEXT,
  contact TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faculty_user_id ON faculty(user_id);

-- ============ HOD TABLE ============
CREATE TABLE IF NOT EXISTS hod (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  department TEXT,
  contact TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hod_user_id ON hod(user_id);

-- ============ TEST DATA (OPTIONAL) ============

-- Insert test faculty user
INSERT INTO users (username, password_hash, email, role)
VALUES ('sv7491', '$2a$10$test_hash_here', 'sv7491@srmist.edu.in', 'faculty')
ON CONFLICT (username) DO NOTHING;

-- Insert test HOD user
INSERT INTO users (username, password_hash, email, role)
VALUES ('hod_admin', '$2a$10$test_hash_here', 'hod@srmist.edu.in', 'hod')
ON CONFLICT (username) DO NOTHING;
