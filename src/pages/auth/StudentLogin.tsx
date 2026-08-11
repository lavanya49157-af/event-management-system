import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
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

export default function StudentLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      localStorage.setItem('demo_mode', 'true');
      window.location.href = '/student';
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Student Login"
      subtitle="Sign in to access your JNTU-GV student dashboard and event certificates."
      roleBadge="STU"
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="student@jntugv.edu.in"
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
          <TextRoll text={isLoading ? 'Signing in...' : 'Sign In as Student'} />
          <span className="w-6 h-6 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
            <ArrowRight size={13} />
          </span>
        </button>

        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2 text-center text-xs text-gray-600 font-medium">
          <p>
            Need a student account?{' '}
            <Link to="/student-register" className="font-bold text-indigo-600 hover:text-indigo-500 underline">
              Register here
            </Link>
          </p>
          <div className="flex items-center justify-center gap-4 pt-1">
            <Link to="/coordinator-login" className="text-gray-500 hover:text-gray-900 transition-colors">
              Coordinator Portal
            </Link>
            <span>•</span>
            <Link to="/faculty-login" className="text-gray-500 hover:text-gray-900 transition-colors">
              Faculty Login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
