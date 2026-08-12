import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, ClipboardCheck, Trophy, Image as ImageIcon, FileText, BarChart, Bell, User as UserIcon, Search, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import UserProfileModal from '../components/common/UserProfileModal';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

export default function CoordinatorDashboardLayout() {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/coordinator', icon: Home },
    { name: 'My Events', path: '/coordinator/events', icon: Calendar },
    { name: 'Participants', path: '/coordinator/participants', icon: Users },
    { name: 'Achievements', path: '/coordinator/achievements', icon: Trophy },
    { name: 'Media', path: '/coordinator/media', icon: ImageIcon },
    { name: 'Reports', path: '/coordinator/reports', icon: FileText },
    { name: 'Analytics', path: '/coordinator/analytics', icon: BarChart },
  ];

  return (
    <div className="bg-[#EFEFEF] min-h-screen flex relative overflow-hidden font-sans text-gray-900">
      {/* Full-Screen Animated WebGL Shader Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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

      {/* LIQUID FROSTED GLASS SIDEBAR */}
      <aside className="w-64 bg-white/85 backdrop-blur-xl text-gray-800 fixed h-full z-20 flex flex-col hidden md:flex border-r border-white/60 shadow-lg">
        <div className="h-20 flex items-center px-6 border-b border-gray-200/60 bg-white/60 backdrop-blur-md">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/images/jntugv_logo.png" alt="JNTU-GV Logo" className="w-10 h-10 object-contain drop-shadow-xs shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xs text-gray-900 tracking-tight">
                Coordinator Hub
              </span>
              <span className="text-[10px] font-medium text-gray-500">
                JNTU-GV Vizianagaram
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F26522] text-white shadow-md shadow-orange-500/20'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {profile?.full_name?.charAt(0) || 'C'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-gray-900 truncate">
                  {profile?.full_name || 'Event Coordinator'}
                </div>
                <div className="text-[10px] font-semibold text-indigo-600 truncate uppercase">
                  COORDINATOR
                </div>
              </div>
            </div>

            <button
              onClick={signOut}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 md:ml-64 flex flex-col relative z-10 min-h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-white/60 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-md hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assigned events, registered students..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-200/80 rounded-full leading-5 bg-white/70 text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F26522] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#F26522] ring-2 ring-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden z-50 animate-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-xs text-gray-900">Notifications</h3>
                    <span className="text-[10px] font-bold text-[#F26522] bg-orange-50 px-2 py-0.5 rounded">2 New</span>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto text-xs">
                    <div className="p-3.5 hover:bg-gray-50 cursor-pointer">
                      <div className="font-bold text-gray-900 mb-0.5">SIH Hackathon Registration Update</div>
                      <div className="text-[11px] text-gray-600 line-clamp-2">285 students registered for SIH 2026 Hackathon.</div>
                      <div className="text-[10px] text-[#F26522] font-semibold mt-1">10 mins ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative border-l border-gray-200/80 pl-3">
              <div 
                className="flex items-center space-x-2.5 cursor-pointer group"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              >
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-[#F26522] transition-colors">{profile?.full_name || 'Coordinator'}</div>
                  <div className="text-[10px] font-semibold text-gray-500 uppercase">{profile?.role || 'COORDINATOR'}</div>
                </div>
                <div className="h-9 w-9 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs border border-gray-200 shadow-xs group-hover:ring-2 ring-orange-200 transition-all">
                  {profile?.full_name?.charAt(0) || 'C'}
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden z-50 animate-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 sm:hidden">
                    <div className="text-xs font-bold text-gray-900">{profile?.full_name || 'Coordinator'}</div>
                    <div className="text-[10px] font-semibold text-gray-500 uppercase">{profile?.role || 'COORDINATOR'}</div>
                  </div>
                  <div className="py-1 text-xs">
                    <button 
                      onClick={() => { setIsProfileModalOpen(true); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#F26522] flex items-center"
                    >
                      <UserIcon className="h-4 w-4 mr-2.5" /> My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#F26522] flex items-center">
                      <Settings className="h-4 w-4 mr-2.5" /> Account Settings
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-1 text-xs">
                    <button 
                      onClick={signOut}
                      className="w-full text-left px-4 py-2.5 font-bold text-rose-600 hover:bg-rose-50 flex items-center"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 relative z-10">
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
