import { User as UserIcon, Mail, BookOpen, GraduationCap, MapPin, Edit3, Camera, Save, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentProfile() {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const getFullDepartmentName = (deptCode: string | undefined) => {
    const map: Record<string, string> = {
      'CSE': 'Computer Science & Engineering',
      'ECE': 'Electronics & Communication Engineering',
      'MECH': 'Mechanical Engineering',
      'CIVIL': 'Civil Engineering',
      'IT': 'Information Technology'
    };
    return deptCode ? (map[deptCode] || deptCode) : 'Computer Science & Engineering';
  };

  const [profileInfo, setProfileInfo] = useState({
    name: profile?.full_name || 'John Doe',
    email: profile?.email || 'john.doe@university.edu',
    studentId: 'STD-2023-4589',
    department: getFullDepartmentName((profile as any)?.department),
    semester: '6th Semester',
    joinYear: '2023',
    phone: '+1 (555) 123-4567',
    address: 'Campus Hostel Block A, Room 402',
    bio: 'Passionate about artificial intelligence and web development. Active member of the university coding club and always looking forward to hackathons and tech symposiums.',
    avatar: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileInfo(prev => ({ ...prev, avatar: base64String }));
        
        // Auto-save the avatar immediately so it's not lost
        const profileKey = `student_profile_data_${profile?.email || 'default'}`;
        const saved = localStorage.getItem(profileKey);
        const data = saved ? JSON.parse(saved) : profileInfo;
        localStorage.setItem(profileKey, JSON.stringify({...data, avatar: base64String}));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!profile) return;
    
    const profileKey = `student_profile_data_${profile.email}`;
    const saved = localStorage.getItem(profileKey);
    
    if (saved) {
      setProfileInfo(JSON.parse(saved));
    } else {
      setProfileInfo(prev => ({ 
        ...prev, 
        name: profile.full_name || prev.name, 
        email: profile.email || prev.email,
        department: getFullDepartmentName((profile as any)?.department) || prev.department
      }));
    }
  }, [profile]);

  const handleSave = () => {
    const profileKey = `student_profile_data_${profile?.email || 'default'}`;
    localStorage.setItem(profileKey, JSON.stringify(profileInfo));
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="px-6 pb-6 relative">
              {/* Profile Avatar */}
              <div className="relative -mt-16 w-32 h-32 mx-auto rounded-full border-4 border-white bg-slate-100 shadow-md flex items-center justify-center overflow-hidden">
                {profileInfo.avatar ? (
                  <img src={profileInfo.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="h-16 w-16 text-slate-400" />
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Update</span>
                </button>
              </div>
              
              <div className="text-center mt-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900">{profileInfo.name}</h2>
                <p className="text-sm font-medium text-indigo-600">{profileInfo.studentId}</p>
                <div className="mt-2 inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Student
                </div>
              </div>
              
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div className="flex items-start text-sm">
                  <Mail className="h-4 w-4 mr-3 text-slate-400 mt-0.5" />
                  <span className="text-slate-700 break-all">{profileInfo.email}</span>
                </div>
                <div className="flex items-start text-sm">
                  <BookOpen className="h-4 w-4 mr-3 text-slate-400 mt-0.5" />
                  <span className="text-slate-700">{profileInfo.department}</span>
                </div>
                <div className="flex items-start text-sm">
                  <GraduationCap className="h-4 w-4 mr-3 text-slate-400 mt-0.5" />
                  <span className="text-slate-700">Class of {parseInt(profileInfo.joinYear) + 4}</span>
                </div>
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 mr-3 text-slate-400 mt-0.5" />
                  <span className="text-slate-700">{profileInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-indigo-200">
                    <Save className="h-4 w-4" /> Save
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                {isEditing ? (
                  <input type="text" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.name} onChange={(e) => setProfileInfo({...profileInfo, name: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.name}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student ID</label>
                {isEditing ? (
                  <input type="text" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.studentId} onChange={(e) => setProfileInfo({...profileInfo, studentId: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.studentId}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                {isEditing ? (
                  <input type="email" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.email} onChange={(e) => setProfileInfo({...profileInfo, email: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.email}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                {isEditing ? (
                  <input type="tel" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.phone} onChange={(e) => setProfileInfo({...profileInfo, phone: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.phone}</div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bio</label>
                {isEditing ? (
                  <textarea rows={3} className="w-full p-3 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none" value={profileInfo.bio} onChange={(e) => setProfileInfo({...profileInfo, bio: e.target.value})} />
                ) : (
                  <div className="text-sm text-slate-700 p-4 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed">
                    {profileInfo.bio}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                {isEditing ? (
                  <input type="text" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.department} onChange={(e) => setProfileInfo({...profileInfo, department: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.department}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Semester</label>
                {isEditing ? (
                  <input type="text" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.semester} onChange={(e) => setProfileInfo({...profileInfo, semester: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.semester}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year of Joining</label>
                {isEditing ? (
                  <input type="text" className="w-full p-2.5 text-sm bg-white rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" value={profileInfo.joinYear} onChange={(e) => setProfileInfo({...profileInfo, joinYear: e.target.value})} />
                ) : (
                  <div className="text-sm font-medium text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">{profileInfo.joinYear}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
