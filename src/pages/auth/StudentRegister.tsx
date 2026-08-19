import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Building, ArrowRight, GraduationCap } from 'lucide-react';
import AuthLayout from '../../components/common/AuthLayout';

const TextRoll = ({ text }: { text: string }) => (
  <span className="relative flex flex-col overflow-hidden h-[20px] leading-[20px]">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 flex flex-col">
      <span className="h-[20px] flex items-center">{text}</span>
      <span className="h-[20px] flex items-center">{text}</span>
    </span>
  </span>
);

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    course: 'B.Tech',
    branch: 'CSE',
    department: 'CSE',
    year: '1st Year'
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('demo_mode', 'true');
      localStorage.setItem('demo_profile', JSON.stringify({
        id: 'demo_' + Date.now(),
        user_id: 'demo_user',
        role: 'STUDENT',
        email: formData.email,
        full_name: formData.fullName,
        course: formData.course,
        branch: formData.branch,
        department: formData.department,
        year: formData.year,
        is_active: true
      }));
      window.location.href = '/student';
    }, 800);
  };

  return (
    <AuthLayout
      title="Create Student Account"
      subtitle="Register to participate in JNTU-GV campus events and download official certificates."
      roleBadge="REG"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User size={18} />
            </div>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              placeholder="student@jntugv.edu.in"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Course
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <GraduationCap size={16} />
              </div>
              <select
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all cursor-pointer"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Pharmacy">B.Pharmacy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Branch / Major
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Building size={16} />
              </div>
              <select
                value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value, department: e.target.value })}
                className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all cursor-pointer"
              >
                <option value="CSE">CSE (Computer Science)</option>
                <option value="ECE">ECE (Electronics & Comm)</option>
                <option value="EEE">EEE (Electrical & Electronics)</option>
                <option value="MECH">MECH (Mechanical Engg)</option>
                <option value="CIVIL">CIVIL (Civil Engg)</option>
                <option value="IT">IT (Info Tech)</option>
                <option value="AI & DS">AI & DS (Artificial Intel)</option>
                <option value="B.Pharm">B.Pharm (Pharmacy)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Department
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Building size={16} />
              </div>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              >
                <option value="CSE">CSE Dept</option>
                <option value="ECE">ECE Dept</option>
                <option value="EEE">EEE Dept</option>
                <option value="MECH">MECH Dept</option>
                <option value="CIVIL">CIVIL Dept</option>
                <option value="IT">IT Dept</option>
                <option value="PHARM">Pharmaceutical Sciences</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Year of Study
            </label>
            <select
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#F26522] hover:bg-[#e05a1a] text-white text-sm font-medium rounded-full py-3.5 px-6 flex items-center justify-center gap-2 group transition-colors duration-300 shadow-md cursor-pointer mt-3"
        >
          <TextRoll text={isLoading ? 'Creating account...' : 'Create Account'} />
          <span className="w-6 h-6 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
            <ArrowRight size={13} />
          </span>
        </button>

        <div className="pt-3 border-t border-gray-100 text-center text-xs text-gray-600 font-medium">
          Already registered?{' '}
          <Link to="/student-login" className="font-bold text-indigo-600 hover:text-indigo-500 underline">
            Sign in here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
