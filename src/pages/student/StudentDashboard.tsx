import { Calendar as CalendarIcon, MapPin, CheckCircle2, ArrowRight, Trophy, Cpu, Building2, Award, Sparkles, CalendarX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const TextRoll = ({ text }: { text: string }) => (
  <span className="relative flex flex-col overflow-hidden h-[18px] leading-[18px]">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 flex flex-col">
      <span className="h-[18px] flex items-center">{text}</span>
      <span className="h-[18px] flex items-center">{text}</span>
    </span>
  </span>
);

export default function StudentDashboard() {
  const { profile } = useAuth();
  const [upcomingEvent, setUpcomingEvent] = useState<any>(null);
  const [userRegistrationsCount, setUserRegistrationsCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('my_registrations');
    if (saved) {
      try {
        const regs = JSON.parse(saved);
        // Filter out any legacy dummy "photography walk" items
        const validRegs = regs.filter((r: any) => r.title && !r.title.includes('Photography'));
        setUserRegistrationsCount(validRegs.length);
        if (validRegs.length > 0) {
          setUpcomingEvent(validRegs[validRegs.length - 1]);
        } else {
          setUpcomingEvent(null);
        }
      } catch (e) {
        setUpcomingEvent(null);
        setUserRegistrationsCount(0);
      }
    } else {
      setUpcomingEvent(null);
      setUserRegistrationsCount(0);
    }
  }, []);

  const stats = [
    { label: 'REGISTERED EVENTS', value: userRegistrationsCount.toString(), color: 'bg-blue-50/90 text-blue-700 border-blue-100' },
    { label: 'UPCOMING EVENTS', value: '3', color: 'bg-indigo-50/90 text-indigo-700 border-indigo-100' },
    { label: 'ATTENDED EVENTS', value: '0', color: 'bg-emerald-50/90 text-emerald-700 border-emerald-100' },
    { label: 'ACHIEVEMENTS', value: '2', color: 'bg-amber-50/90 text-amber-700 border-amber-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 font-sans text-gray-900">
      
      {/* Welcome Banner */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-100/60 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-extrabold bg-gray-900 text-white px-2.5 py-0.5 rounded-md tracking-wider uppercase">
              JNTU-GV Vizianagaram Portal
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Sparkles size={13} /> Active Student Account
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Hii, {profile?.full_name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 font-normal max-w-2xl leading-relaxed">
            Centralized campus event management, automated report generation, digital certificates, and institutional achievements.
          </p>
        </div>

        <Link
          to="/student/explore"
          className="relative z-10 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold rounded-full pl-5 pr-2 py-2.5 flex items-center gap-3 group transition-colors duration-300 shadow-md cursor-pointer shrink-0"
        >
          <TextRoll text="Explore Campus Events" />
          <span className="w-6 h-6 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
            <ArrowRight size={13} />
          </span>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white/90 backdrop-blur-md rounded-2xl ${stat.color} border shadow-xs p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">{stat.value}</span>
            <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-85">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Registered Event */}
          <section>
            <h2 className="text-xs font-bold text-gray-600 mb-4 tracking-wider uppercase flex items-center gap-2">
              <CalendarIcon size={14} className="text-indigo-600" />
              <span>My Upcoming Registered Event</span>
            </h2>

            {upcomingEvent ? (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/80 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 bg-[#F26522] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-xs">
                  Active Registration
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-56 h-36 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 shadow-2xs">
                    <img src={upcomingEvent.image || '/images/jntugv_main_campus.png'} alt={upcomingEvent.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{upcomingEvent.title}</h3>
                      <div className="flex items-center text-gray-600 text-xs mb-1 font-medium">
                        <CalendarIcon className="h-3.5 w-3.5 mr-2 text-indigo-600" />
                        {upcomingEvent.date} • {upcomingEvent.time || '10:00 AM'}
                      </div>
                      <div className="flex items-center text-gray-600 text-xs font-medium">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-indigo-600" />
                        {upcomingEvent.location || 'JNTU-GV Vizianagaram Campus'}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                        Registration Confirmed
                      </span>
                      <Link to="/student/registrations" className="text-xs font-bold text-gray-900 hover:text-indigo-600 flex items-center transition-colors">
                        View Registrations <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* CLEAN EMPTY STATE CARD WHEN USER HAS NOT REGISTERED YET */
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xs border border-gray-200/80 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center">
                  <CalendarX size={28} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">No Registered Events Yet</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-md">
                    You haven't registered for any upcoming campus events. Explore available JNTU-GV workshops, symposiums, and cultural fests to get started.
                  </p>
                </div>
                <Link
                  to="/student/explore"
                  className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-full px-5 py-2.5 flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>Explore JNTU-GV Events</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </section>

          {/* Recommended Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} className="text-[#F26522]" />
                <span>Recommended JNTU-GV Events</span>
              </h2>
              <Link to="/student/explore" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                { title: 'ITYUKTA 2K26 CSE Fest', dept: 'CSE Department', date: 'Sep 18', location: 'Main Auditorium', tag: 'Symposium', icon: Cpu, image: '/images/jntugv_cse_symposium.png' },
                { title: 'SCCI VLSI Design Workshop', dept: 'ECE & R&D Cell', date: 'Sep 25', location: 'ECE Hall', tag: 'Workshop', icon: Award, image: '/images/jntugv_vlsi_workshop.png' },
                { title: 'Pratistha 2026 Civil Fest', dept: 'Civil Department', date: 'Oct 05', location: 'Civil Block', tag: 'Fest', icon: Building2, image: '/images/jntugv_main_campus.png' },
              ].map((event, i) => (
                <Link to="/student/explore" key={i} className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xs border border-white/80 hover:border-gray-900 hover:shadow-lg transition-all duration-300 cursor-pointer group block">
                  <div className="h-28 bg-gray-100 rounded-xl mb-3 overflow-hidden relative border border-gray-100">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 bg-gray-900/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs">
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                  <div className="text-[11px] text-gray-500 font-medium flex justify-between">
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* Side Column */}
        <div className="space-y-8">
          
          {/* Recent Activity */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md border border-white/80 p-6">
            <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-600" />
              <span>Recent Campus Activity</span>
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Viewed ITYUKTA 2K26 Symposium', time: '10 mins ago', icon: '🔍', color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
                { title: 'Explored SCCI Semiconductor Workshop', time: '1 hour ago', icon: '🔍', color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
                { title: 'JNTU-GV Student Account Verified', time: 'Today', icon: '✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{activity.title}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md border border-white/80 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <Trophy size={14} className="text-amber-500" />
                <span>My Campus Achievements</span>
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { title: 'SCCI VLSI Prototyping Participant', type: 'Certificate Granted', icon: Trophy },
                { title: 'National Technical Paper Presentation', type: 'Certificate Granted', icon: Award },
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/90 border border-gray-100/80">
                  <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ach.icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{ach.title}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{ach.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/student/achievements" className="w-full mt-4 py-2.5 text-xs font-bold text-gray-900 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full transition-all duration-300 block text-center shadow-xs">
              View All Achievements
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
