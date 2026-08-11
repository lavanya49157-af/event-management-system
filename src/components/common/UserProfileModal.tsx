import { X, User, Mail, Shield, Building, Clock, Edit2, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    department: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        department: (profile as any).department || 'CSE'
      });
    }
  }, [profile]);

  if (!isOpen || !profile) return null;

  const handleSave = () => {
    const isDemo = localStorage.getItem('demo_mode') === 'true';
    if (isDemo) {
      const savedProfile = localStorage.getItem('demo_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        parsed.full_name = formData.full_name;
        parsed.department = formData.department;
        localStorage.setItem('demo_profile', JSON.stringify(parsed));
      } else {
        // Fallback if demo_profile doesn't exist yet but demo_mode is true
        localStorage.setItem('demo_profile', JSON.stringify({
          ...profile,
          full_name: formData.full_name,
          department: formData.department
        }));
      }
      setIsEditing(false);
      window.location.reload(); // Refresh to update the UI globally
    } else {
      // In a real app, you would call supabase.from('profiles').update(...)
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <User className="h-5 w-5 mr-2 text-indigo-600" />
              My Profile
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50">
            {/* Profile Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <div className="h-24 w-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4 shadow-md border-4 border-indigo-50">
                {profile.full_name?.charAt(0) || 'U'}
              </div>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="text-2xl font-bold text-slate-900 text-center border-b-2 border-indigo-500 focus:outline-none w-full max-w-xs mx-auto"
                />
              ) : (
                <h3 className="text-2xl font-bold text-slate-900">{profile.full_name}</h3>
              )}
              <p className="text-indigo-600 font-medium capitalize mt-2">{profile.role?.toLowerCase() || 'User'}</p>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 text-sm">
                Account Information
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4 text-slate-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</div>
                    <div className="font-medium text-slate-900">{profile.email || 'Not provided'}</div>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4 text-slate-500">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Access Role</div>
                    <div className="font-medium text-slate-900 capitalize">{profile.role?.toLowerCase()}</div>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4 text-slate-500">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Department</div>
                    {isEditing ? (
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="font-medium text-slate-900 border-b-2 border-indigo-500 focus:outline-none w-full bg-white"
                      >
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="CIVIL">Civil Engineering</option>
                        <option value="IT">Information Technology</option>
                      </select>
                    ) : (
                      <div className="font-medium text-slate-900">{(profile as any).department || 'Computer Science & Engineering'}</div>
                    )}
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4 text-slate-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</div>
                    <div className="font-medium text-emerald-600 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                      Active Account
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-4 space-y-3">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-sm flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors text-sm flex items-center justify-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              )}
              {!isEditing && (
                <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors text-sm">
                  Change Password
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
