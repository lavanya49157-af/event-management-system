import { Calendar as CalendarIcon, MapPin, CheckCircle2, ArrowRight, FileText, Image as ImageIcon, Users, AlertCircle, Plus, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CalendarModal from '../../components/common/CalendarModal';
import { getSharedEvents } from '../../data/mockEvents';

export default function CoordinatorDashboard() {
  const { profile } = useAuth();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const events = getSharedEvents();

  const stats = [
    { label: 'My Events', value: '12', color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-100' },
    { label: 'Upcoming', value: '4', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100' },
    { label: 'Completed', value: '7', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-100' },
    { label: 'Participants', value: '842', color: 'bg-purple-50 text-purple-700', border: 'border-purple-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hii, {profile?.full_name?.split(' ')[0] || 'Coordinator'} 👋</h1>
          <p className="text-slate-600 mt-1">Here's an overview of the events you're managing.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setIsCalendarOpen(true)} className="btn-secondary flex items-center gap-2">
             <CalendarIcon className="h-4 w-4" /> View Calendar
           </button>
           <button className="btn-primary flex items-center gap-2">
             <Plus className="h-4 w-4" /> Create Event
           </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`card ${stat.color} ${stat.border} border shadow-sm p-5 flex flex-col items-center justify-center text-center`}>
            <span className="text-3xl font-extrabold mb-1">{stat.value}</span>
            <span className="text-sm font-medium opacity-80">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Column - Upcoming Events */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Upcoming Events</h2>
            <Link to="/coordinator/events" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All →</Link>
          </div>
          
          {/* Detailed Event Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                IN 2 DAYS
             </div>
             
             <div className="mb-6">
               <h3 className="text-xl font-bold text-slate-900 mb-1">AI & Machine Learning Workshop</h3>
               <p className="text-slate-500 text-sm flex items-center gap-2">
                 <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">Technical</span> • 
                 <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">CSE</span> • 
                 <CalendarIcon className="h-4 w-4 ml-1" /> Aug 20 • 
                 <MapPin className="h-4 w-4 ml-1" /> Seminar Hall 1
               </p>
             </div>

             <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /> Registration</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-900 font-bold">124 / 150</span>
                    <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">83%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="text-slate-600 font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-slate-400" /> Report Status</span>
                  <span className="flex items-center gap-1.5 text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">
                    Draft <AlertCircle className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="text-slate-600 font-medium flex items-center gap-2"><ImageIcon className="h-4 w-4 text-slate-400" /> Media Uploads</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                    32 Files <CheckCircle2 className="h-4 w-4" />
                  </span>
                </div>
             </div>

             <div className="bg-slate-50 -mx-6 -mb-6 p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="w-full sm:w-1/2">
                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                   <span>COMPLETION</span>
                   <span>80%</span>
                 </div>
                 <div className="w-full bg-slate-200 rounded-full h-2">
                   <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                 </div>
               </div>
               <button className="btn-secondary w-full sm:w-auto">Manage Event</button>
             </div>
          </div>
          
          {/* Event Completion Checklist */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Event Completion Tracker</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">AI Workshop 2026</h3>
                <div className="text-xs font-bold text-indigo-600">Overall Progress: 78%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                 <CheckCircle2 className="h-4 w-4" /> Event Details
               </div>
               <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                 <CheckCircle2 className="h-4 w-4" /> Participants Added
               </div>
               <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                 <CheckCircle2 className="h-4 w-4" /> Attendance Marked
               </div>
               <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                 <CheckCircle2 className="h-4 w-4" /> Photos Uploaded
               </div>
               <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                 <CheckCircle2 className="h-4 w-4" /> Achievements Published
               </div>
               <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100 font-medium">
                 <AlertCircle className="h-4 w-4" /> Report Pending
               </div>
            </div>
          </div>

        </div>

        {/* Side Column */}
        <div className="space-y-6">
          
          {/* Registration & Attendance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Registrations</h3>
              <div className="text-2xl font-bold text-slate-900">124 <span className="text-sm font-medium text-slate-400">/ 150</span></div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Attendance</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">Present</span>
                  <span className="font-bold text-slate-900">132</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-rose-600 font-medium">Absent</span>
                  <span className="font-bold text-slate-900">18</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-100 mt-1">
                  <span className="text-slate-500">Rate</span>
                  <span className="font-bold text-indigo-600">88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Report Status</h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50">
                 <span className="flex items-center gap-2 font-medium text-slate-700"><FileText className="h-4 w-4 text-slate-400" /> Draft Reports</span>
                 <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">2</span>
               </div>
               <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50">
                 <span className="flex items-center gap-2 font-medium text-slate-700"><FileText className="h-4 w-4 text-emerald-500" /> Final Reports</span>
                 <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">5</span>
               </div>
               <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50">
                 <span className="flex items-center gap-2 font-medium text-slate-700"><AlertCircle className="h-4 w-4 text-rose-500" /> Pending</span>
                 <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">1</span>
               </div>
             </div>
             <button className="w-full mt-4 text-sm font-medium text-indigo-600 py-2 border border-indigo-100 rounded hover:bg-indigo-50">
               Manage Reports
             </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
             <div className="space-y-2">
               <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 border border-transparent hover:border-slate-200 transition-colors">
                 <Plus className="h-4 w-4" /> Create New Event
               </button>
               <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 border border-transparent hover:border-slate-200 transition-colors">
                 <Users className="h-4 w-4" /> Add Participants (Bulk)
               </button>
               <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 border border-transparent hover:border-slate-200 transition-colors">
                 <ClipboardCheck className="h-4 w-4" /> Mark Attendance
               </button>
               <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 border border-transparent hover:border-slate-200 transition-colors">
                 <ImageIcon className="h-4 w-4" /> Upload Event Media
               </button>
             </div>
          </div>

        </div>
      </div>

      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        allEvents={events}
      />
    </div>
  );
}
