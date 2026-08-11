import { BarChart3, TrendingUp, Users, Calendar, Activity, ArrowUpRight } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-1">Key performance metrics and platform engagement data.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md">
              +12% <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-500 mb-1">Total Users</div>
          <div className="text-3xl font-black text-slate-900">4,289</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md">
              +8% <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-500 mb-1">Events Hosted</div>
          <div className="text-3xl font-black text-slate-900">142</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
            <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md">
              +24% <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-500 mb-1">Total Registrations</div>
          <div className="text-3xl font-black text-slate-900">12,504</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="flex items-center text-rose-600 text-sm font-bold bg-rose-50 px-2 py-1 rounded-md">
              -2% <ArrowUpRight className="h-3 w-3 ml-1 rotate-90" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-500 mb-1">Avg Attendance Rate</div>
          <div className="text-3xl font-black text-slate-900">86%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Registration Trends</h3>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
             {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="w-full bg-indigo-100 rounded-t-sm relative group cursor-pointer hover:bg-indigo-200 transition-colors" style={{ height: `${h}%` }}>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h * 12}
                   </div>
                   <div className="absolute inset-x-0 bottom-0 bg-indigo-500 rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                </div>
             ))}
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 mt-4 px-2">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Top Departments by Events</h3>
          </div>
          <div className="space-y-6">
             {[
               { name: 'Computer Science', count: 45, color: 'bg-blue-500' },
               { name: 'Information Tech', count: 40, color: 'bg-indigo-500' },
               { name: 'Electronics', count: 32, color: 'bg-purple-500' },
               { name: 'Mechanical', count: 24, color: 'bg-rose-500' },
             ].map((dept, i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm font-bold mb-2">
                   <span className="text-slate-700">{dept.name}</span>
                   <span className="text-slate-900">{dept.count} Events</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${dept.color}`} style={{ width: `${(dept.count / 50) * 100}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy icon to resolve import
const MoreHorizontal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
