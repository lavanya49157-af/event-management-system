import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, CalendarCheck, Heart, Trophy, FileBadge, Bell, User as UserIcon, Calendar, LogOut, User, Settings, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import DashboardCalendar from '../components/DashboardCalendar';
import UserProfileModal from '../components/common/UserProfileModal';

export default function StudentDashboardLayout() {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    if (signOut) signOut();
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendarPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  const navItems = [
    { name: 'Dashboard', path: '/student', icon: Home },
    { name: 'Explore Events', path: '/student/explore', icon: Compass },
    { name: 'My Registrations', path: '/student/registrations', icon: CalendarCheck },
    { name: 'Saved Events', path: '/student/saved', icon: Heart },
    { name: 'Achievements', path: '/student/achievements', icon: Trophy },
    { name: 'Certificates', path: '/student/certificates', icon: FileBadge },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'My Profile', path: '/student/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-[#EFEFEF] flex font-sans selection:bg-gray-900 selection:text-white text-gray-900 relative overflow-hidden">
      {/* Animated Shader Overlay (Same as Landing Page) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Shader className="w-full h-full">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/80 fixed h-full z-30 flex flex-col hidden md:flex shadow-xs">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/images/jntugv_logo.png" alt="JNTU-GV Logo" className="w-10 h-10 object-contain drop-shadow-xs shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-gray-900 tracking-tight">JNTU-GV Portal</span>
              <span className="text-[10px] font-semibold text-gray-500">Student Portal</span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-xs font-bold text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 shadow-2xs">
          <div className="flex-1 flex items-center">
            <span className="text-xs font-semibold text-gray-600 hidden sm:inline-block">
              JNTU-GV Vizianagaram • Academic Session 2026–27
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative" ref={calendarRef}>
              <button 
                onClick={() => { setShowCalendarPopup(!showCalendarPopup); setShowNotifications(false); setShowProfileMenu(false); }}
                className={`relative p-2 transition-colors rounded-full ${showCalendarPopup ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Calendar className="h-5 w-5" />
              </button>
              
              {showCalendarPopup && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 p-4 origin-top-right">
                  <DashboardCalendar />
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowCalendarPopup(false); setShowProfileMenu(false); }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#F26522] ring-2 ring-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Notifications</h3>
                    <span className="text-[10px] font-extrabold text-white bg-gray-900 px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="text-xs font-bold text-gray-900 mb-1">Registration Confirmed</div>
                      <div className="text-xs text-gray-500 line-clamp-2">SCCI Semiconductor VLSI Workshop registration is active.</div>
                      <div className="text-[10px] text-indigo-600 font-semibold mt-2">Just now</div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="text-xs font-bold text-gray-900 mb-1">Certificate Available</div>
                      <div className="text-xs text-gray-500 line-clamp-2">Download your NAAC-compliant certificate for Technical Paper Presentation.</div>
                      <div className="text-[10px] text-indigo-600 font-semibold mt-2">1 day ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative border-l border-gray-200 pl-4">
              <div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); setShowCalendarPopup(false); }}
              >
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{profile?.full_name || 'Student'}</div>
                  <div className="text-[10px] font-semibold text-gray-500 capitalize">JNTU-GV Student</div>
                </div>
                <div className="h-9 w-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs border border-gray-200 shadow-xs group-hover:ring-2 ring-gray-300 transition-all">
                  {profile?.full_name?.charAt(0) || 'S'}
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 sm:hidden">
                    <div className="text-xs font-bold text-gray-900">{profile?.full_name || 'Student'}</div>
                    <div className="text-[10px] font-semibold text-gray-500">Student</div>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => { setIsProfileModalOpen(true); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                    >
                      <User className="h-4 w-4 mr-3" /> My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center">
                      <Settings className="h-4 w-4 mr-3" /> Account Settings
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-2">
                    <button 
                      onClick={signOut}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
}
