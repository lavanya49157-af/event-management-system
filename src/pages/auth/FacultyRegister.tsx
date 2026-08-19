import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

export default function FacultyRegister() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    course: 'B.Tech',
    branch: 'CSE',
    department: 'CSE'
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
        role: 'ADMIN',
        email: formData.email,
        full_name: formData.fullName,
        course: formData.course,
        branch: formData.branch,
        department: formData.department,
        is_active: true
      }));
      window.location.href = '/admin';
    }, 1000);
  };

  return (
    <AuthLayout
      title="Create Faculty Account"
      subtitle="JNTU-GV Vizianagaram Faculty & Admin Access"
      roleBadge="FACULTY"
      footerLinkText="Already have a Faculty account?"
      footerLinkTo="/faculty-login"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User size={16} />
            </div>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="block w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium"
              placeholder="Dr. John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">University Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={16} />
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="block w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium"
              placeholder="faculty@jntugv.edu.in"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Course Program</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <GraduationCap size={16} />
              </div>
              <select
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                className="block w-full pl-9 pr-2 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium cursor-pointer"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Pharmacy">B.Pharmacy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Branch / Major</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Building size={16} />
              </div>
              <select
                value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value, department: e.target.value })}
                className="block w-full pl-9 pr-2 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium cursor-pointer"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
                <option value="AI & DS">AI & DS</option>
                <option value="B.Pharm">B.Pharm</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Building size={16} />
            </div>
            <select
              value={formData.department}
              onChange={e => setFormData({ ...formData, department: e.target.value })}
              className="block w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium"
            >
              <option value="CSE">Computer Science & Engineering</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="PHARM">College of Pharmaceutical Sciences</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Lock size={16} />
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="block w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white text-xs font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-bold rounded-full py-3 px-6 flex items-center justify-center gap-2 group transition-all shadow-md cursor-pointer disabled:opacity-70 mt-2"
        >
          {isLoading ? (
            <span>Creating account...</span>
          ) : (
            <>
              <TextRoll text="Create Faculty Account" />
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
