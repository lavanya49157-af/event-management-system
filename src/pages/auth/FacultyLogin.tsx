import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Building, ArrowRight } from 'lucide-react';
import AuthLayout from '../../components/common/AuthLayout';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const TextRoll = ({ text }: { text: string }) => (
  <span className="relative flex flex-col overflow-hidden h-[20px] leading-[20px]">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 flex flex-col">
      <span className="h-[20px] flex items-center">{text}</span>
      <span className="h-[20px] flex items-center">{text}</span>
    </span>
  </span>
);

export default function FacultyLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      localStorage.setItem('demo_mode', 'true');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (department: string) => {
    localStorage.setItem('demo_mode', 'true');
    localStorage.setItem('demo_profile', JSON.stringify({
      id: 'demo_' + Date.now(),
      user_id: 'demo_user',
      role: 'ADMIN',
      email: `admin@${department.toLowerCase()}.edu`,
      full_name: `${department} Admin`,
      department: department,
      is_active: true
    }));
    navigate('/admin');
    window.location.reload();
  };

  return (
    <AuthLayout
      title="Faculty / Admin Login"
      subtitle="Sign in to access university administration, event approvals, and institutional analytics."
      roleBadge="FAC"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              id="email"
              type="email"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              placeholder="faculty@jntugv.edu.in"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type="password"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              placeholder="••••••••"
              {...register('password')}
            />
          </div>
          {errors.password && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#F26522] hover:bg-[#e05a1a] text-white text-sm font-medium rounded-full py-3.5 px-6 flex items-center justify-center gap-2 group transition-colors duration-300 shadow-md cursor-pointer mt-2"
        >
          <TextRoll text={isLoading ? 'Signing in...' : 'Sign In as Faculty'} />
          <span className="w-6 h-6 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
            <ArrowRight size={13} />
          </span>
        </button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center mb-2.5">
          Quick Department Demo Access
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['CSE', 'ECE', 'MECH', 'CIVIL'].map(dept => (
            <button
              key={dept}
              type="button"
              onClick={() => handleDemoLogin(dept)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
            >
              <Building size={13} />
              {dept} Admin
            </button>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
