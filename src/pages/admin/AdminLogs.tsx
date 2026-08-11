import { Download, Search, ShieldAlert, LogIn, FileEdit, Trash2, Key } from 'lucide-react';

export default function AdminLogs() {
  const logs = [
    { id: 1, action: 'Event Deleted', user: 'Admin Root', details: 'Deleted "Spring Festival" (ID: 104)', time: '10:45 AM', type: 'danger', icon: Trash2 },
    { id: 2, action: 'Role Update', user: 'Admin Root', details: 'Changed Dr. Alan Turing role to COORDINATOR', time: '09:30 AM', type: 'warning', icon: Key },
    { id: 3, action: 'Event Created', user: 'Dr. Claude Shannon', details: 'Created "Tech Symposium 2026"', time: 'Yesterday', type: 'info', icon: FileEdit },
    { id: 4, action: 'User Login', user: 'John Doe', details: 'Successful login from IP 192.168.1.45', time: 'Yesterday', type: 'success', icon: LogIn },
    { id: 5, action: 'Failed Login', user: 'Unknown', details: '3 failed attempts from IP 10.0.0.5', time: 'Aug 08', type: 'danger', icon: ShieldAlert },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Audit Logs</h1>
          <p className="text-slate-600 mt-1">Track administrative actions and security events.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold rounded-lg shadow-sm transition-colors">
          <Download className="h-4 w-4 mr-2" /> Export Logs
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs by user or action..." 
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm"
          />
        </div>
        <div className="flex gap-2">
           <select className="bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
             <option>All Events</option>
             <option>Security</option>
             <option>Modifications</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm">
                <th className="p-4 font-bold text-slate-700">Action</th>
                <th className="p-4 font-bold text-slate-700">User</th>
                <th className="p-4 font-bold text-slate-700">Details</th>
                <th className="p-4 font-bold text-slate-700 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => {
                const Icon = log.icon;
                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                          log.type === 'danger' ? 'bg-red-50 text-red-600' :
                          log.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                          log.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-slate-900">{log.action}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-slate-700">{log.user}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600">{log.details}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-xs font-bold text-slate-400">{log.time}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
