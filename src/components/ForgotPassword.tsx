import { useState } from 'react';
import { ArrowLeft, Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { generatePasswordResetOTP, verifyPasswordResetOTP, validateEmail, validateRollNumber, isSupabaseConfigured } from '../lib/supabaseConfig';

type UserRole = 'student' | 'teaching-staff' | 'non-teaching-staff' | 'maintenance-head';

type ForgotPasswordProps = {
  role: UserRole;
  onBack: () => void;
};

export function ForgotPassword({ role, onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    if (!validateEmail(email)) {
      toast.error('Email must end with @psgitech.ac.in');
      setIsLoading(false);
      return;
    }

    // Validate roll number for students
    if (role === 'student' && !validateRollNumber(rollNumber)) {
      toast.error('Roll number must start with 7155');
      setIsLoading(false);
      return;
    }

    try {
      // Try to generate OTP via Supabase
      const result = await generatePasswordResetOTP(email, role === 'student' ? rollNumber : undefined);
      
      setStep('otp');
      toast.success(result.message);
      console.log('Check your email for the OTP code');
    } catch (error: any) {
      // Fallback to demo mode if Supabase is not configured
      if (!isSupabaseConfigured() || error.message.includes('Failed to generate OTP')) {
        // Simulate OTP generation in demo mode
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setStep('otp');
        toast.success(`Demo mode: OTP sent to ${email}`);
        console.log('Demo OTP:', otp);
      } else {
        toast.error(error.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Try to verify OTP via Supabase
      await verifyPasswordResetOTP(email, otp);
      
      setStep('success');
      toast.success('OTP verified! Password reset link sent to your email.');
    } catch (error: any) {
      // Fallback to demo mode verification
      if (generatedOtp && otp === generatedOtp) {
        setStep('success');
        toast.success('Demo mode: OTP verified successfully');
      } else if (!isSupabaseConfigured()) {
        // Demo mode fallback
        if (otp === generatedOtp) {
          setStep('success');
          toast.success('Demo mode: Password reset link sent');
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      } else {
        toast.error(error.message || 'Invalid or expired OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={onBack}
            className="mb-6 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </button>

          {step === 'email' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <Mail className="w-8 h-8 text-blue-700" />
                </div>
                <h2 className="text-slate-900 mb-2">Forgot Password</h2>
                <p className="text-slate-600 text-sm">
                  Enter your email address and {role === 'student' ? 'roll number' : 'employee ID'} to receive an OTP
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                {role === 'student' && (
                  <div>
                    <label htmlFor="rollNumber" className="block text-sm text-slate-700 mb-2">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      id="rollNumber"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="7155XXXXXXXX"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Roll number must start with 7155</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="yourname@psgitech.ac.in"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Email must end with @psgitech.ac.in</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <KeyRound className="w-8 h-8 text-blue-700" />
                </div>
                <h2 className="text-slate-900 mb-2">Verify OTP</h2>
                <p className="text-slate-600 text-sm">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm text-slate-700 mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full text-sm text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-700" />
                </div>
                <h2 className="text-slate-900 mb-2">Success!</h2>
                <p className="text-slate-600 text-sm mb-6">
                  A password reset link has been sent to your email address. Please check your inbox and follow the instructions.
                </p>
                <button
                  onClick={onBack}
                  className="w-full py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Having trouble? Contact <span className="text-blue-700">support@psgitech.ac.in</span>
          </p>
        </div>
      </div>
    </div>
  );
}