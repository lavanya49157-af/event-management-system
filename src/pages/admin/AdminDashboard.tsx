import { Calendar as CalendarIcon, MapPin, Users, Calendar, Plus, BarChart3, PieChart, Activity, ArrowRight, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Total Events', value: '42', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'Upcoming Fests', value: '18', icon: CalendarIcon, color: 'text-[#F26522]', bg: 'bg-orange-50 border-orange-100' },
    { label: 'Verified Reports', value: '100%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'Registered Students', value: '1,420', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-[#F26522]" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              JNTU-GV Event Report And Management Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Hii, {profile?.full_name?.split(' ')[0] || 'Faculty'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal">
            Departmental event management, NBA & NAAC compliance archiving, and student participant tracking.
          </p>
        </div>

        <Link
          to="/admin/events"
          className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-bold rounded-full px-5 py-2.5 flex items-center gap-2 group transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Plus size={15} />
          <span>Create New Event</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-200/80 shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 block mb-1">
              {stat.value}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Charts / Activity Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">Event Report Archive Growth</h2>
            <button className="text-gray-400 hover:text-gray-600"><BarChart3 className="h-5 w-5" /></button>
          </div>
          <div className="h-56 flex items-center justify-center bg-gray-50/60 rounded-xl border border-dashed border-gray-200">
            <div className="text-center text-gray-400">
              <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-40 text-[#F26522]" />
              <p className="text-xs font-semibold">NBA / NAAC Monthly Report Submissions</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">Events by Department</h2>
            <Link to="/admin/categories" className="text-xs font-bold text-[#F26522] hover:underline">
              Manage Categories
            </Link>
          </div>
          <div className="h-56 flex items-center justify-center bg-gray-50/60 rounded-xl border border-dashed border-gray-200">
            <div className="text-center text-gray-400">
              <PieChart className="h-10 w-10 mx-auto mb-2 opacity-40 text-[#F26522]" />
              <p className="text-xs font-semibold">CSE, ECE, Civil, Pharmacy & Sports Distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Column */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Column - Upcoming Events */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-900">Official JNTU-GV Campus Events</h2>
              <Link to="/admin/events" className="text-xs font-bold text-[#F26522] hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { title: 'JNTU-GV 1st Convocation Ceremony', dept: 'University Admin', date: 'July 11, 2026', seats: '1420 Registered', status: 'Archived Report', image: '/images/jntugv_convocation_ceremony.png' },
                { title: 'Smart India Hackathon (SIH 2026)', dept: 'CSE Dept', date: 'Sep 18, 2026', seats: '285 Registered', status: 'Registration Open', image: '/images/jntugv_cse_symposium.png' },
                { title: 'SCCI Semiconductor Design Workshop', dept: 'ECE & R&D Cell', date: 'Sep 25, 2026', seats: '210 Registered', status: 'Upcoming', image: '/images/jntugv_vlsi_workshop.png' },
              ].map((ev, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <img src={ev.image} alt={ev.title} className="w-14 h-14 rounded-xl object-cover border border-gray-200/80 shrink-0" />
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900">{ev.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px]">{ev.dept}</span>
                        <span className="flex items-center gap-1 text-[11px]"><CalendarIcon size={12} /> {ev.date}</span>
                        <span className="flex items-center gap-1 text-[11px]"><Users size={12} /> {ev.seats}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 whitespace-nowrap">
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Column - Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-xs p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Management Actions</h3>
            <div className="space-y-3 text-xs">
              <Link to="/admin/events" className="w-full bg-gray-50 hover:bg-orange-50 text-gray-800 hover:text-[#F26522] p-3 rounded-xl font-bold flex items-center justify-between border border-gray-200/60 transition-colors group">
                <span className="flex items-center gap-2.5"><Plus size={15} className="text-[#F26522]" /> Create New Event</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/reports" className="w-full bg-gray-50 hover:bg-orange-50 text-gray-800 hover:text-[#F26522] p-3 rounded-xl font-bold flex items-center justify-between border border-gray-200/60 transition-colors group">
                <span className="flex items-center gap-2.5"><Award size={15} className="text-[#F26522]" /> Generate Official Report</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/participants" className="w-full bg-gray-50 hover:bg-orange-50 text-gray-800 hover:text-[#F26522] p-3 rounded-xl font-bold flex items-center justify-between border border-gray-200/60 transition-colors group">
                <span className="flex items-center gap-2.5"><Users size={15} className="text-[#F26522]" /> View Student Registrations</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
