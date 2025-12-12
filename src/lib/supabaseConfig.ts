import { createClient } from '@supabase/supabase-js';

// Environment variables - using fallback values for demo mode
const supabaseUrl = typeof window !== 'undefined' 
  ? (window as any).NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
  : 'YOUR_SUPABASE_URL';

const supabaseAnonKey = typeof window !== 'undefined'
  ? (window as any).NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
  : 'YOUR_SUPABASE_ANON_KEY';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';
};

export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Validate email format
export const validateEmail = (email: string): boolean => {
  return email.endsWith('@psgitech.ac.in');
};

// Validate roll number format
export const validateRollNumber = (rollNumber: string): boolean => {
  return rollNumber.startsWith('7155');
};

// User authentication
export const authenticateUser = async (id: string, password: string, role: string) => {
  if (!supabase) {
    console.warn('Supabase not configured - running in demo mode');
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq(role === 'student' ? 'roll_number' : 'employee_id', id)
    .eq('role', role)
    .single();

  if (error || !data) {
    return null;
  }

  // In production, verify hashed password
  // For now, direct comparison (NOT SECURE - use bcrypt in production)
  if (data.password === password) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
    };
  }

  return null;
};

// Generate and store OTP for password reset
export const generatePasswordResetOTP = async (email: string, rollNumber?: string) => {
  if (!validateEmail(email)) {
    throw new Error('Email must end with @psgitech.ac.in');
  }

  // For students, validate roll number
  if (rollNumber && !validateRollNumber(rollNumber)) {
    throw new Error('Roll number must start with 7155');
  }

  if (!supabase) {
    console.warn('Supabase not configured - running in demo mode');
    throw new Error('Database not configured');
  }

  // Verify user exists
  const query = supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (rollNumber) {
    query.eq('roll_number', rollNumber);
  }

  const { data: user, error: userError } = await query.single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Store OTP in database
  const { error: otpError } = await supabase
    .from('password_reset_tokens')
    .insert([
      {
        email,
        otp,
        expires_at: expiresAt.toISOString(),
        used: false,
      },
    ]);

  if (otpError) {
    throw new Error('Failed to generate OTP');
  }

  // TODO: Send email with OTP using email service (SendGrid, AWS SES, etc.)
  console.log(`OTP for ${email}: ${otp}`); // Remove in production

  return { success: true, message: 'OTP sent to your email' };
};

// Verify OTP
export const verifyPasswordResetOTP = async (email: string, otp: string) => {
  if (!supabase) {
    console.warn('Supabase not configured - running in demo mode');
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('*')
    .eq('email', email)
    .eq('otp', otp)
    .eq('used', false)
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error('Invalid or expired OTP');
  }

  // Mark OTP as used
  await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('id', data.id);

  return { success: true, message: 'OTP verified successfully' };
};

// Get subjects by department
export const getSubjectsByDepartment = async (department: string) => {
  if (!supabase) {
    console.warn('Supabase not configured - returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('subjects')
    .select('*, faculty:faculty_id(*)')
    .eq('department', department);

  if (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }

  return data || [];
};

// Get seminar halls by department
export const getSeminarHallsByDepartment = async (department: string) => {
  if (!supabase) {
    console.warn('Supabase not configured - returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('seminar_halls')
    .select('*')
    .eq('department', department);

  if (error) {
    console.error('Error fetching seminar halls:', error);
    return [];
  }

  return data || [];
};

// Get all seminar halls
export const getAllSeminarHalls = async () => {
  if (!supabase) {
    console.warn('Supabase not configured - returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('seminar_halls')
    .select('*')
    .order('department');

  if (error) {
    console.error('Error fetching seminar halls:', error);
    return [];
  }

  return data || [];
};

// Create seminar booking
export const createSeminarBooking = async (booking: {
  hall_id: string;
  user_id: string;
  purpose: string;
  date: string;
  start_time: string;
  end_time: string;
  participants: number;
}) => {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('seminar_bookings')
    .insert([{ ...booking, status: 'pending' }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create booking');
  }

  return data;
};

// Submit complaint
export const submitComplaint = async (complaint: {
  student_id: string;
  category: string;
  priority: string;
  location: string;
  description: string;
}) => {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('complaints')
    .insert([{ ...complaint, status: 'pending', submitted_date: new Date().toISOString() }])
    .select()
    .single();

  if (error) {
    throw new Error('Failed to submit complaint');
  }

  return data;
};