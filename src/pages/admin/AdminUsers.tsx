import { useState } from 'react';
import { Search, Filter, Mail, Shield, User, Clock, MoreHorizontal } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Root', email: 'admin@univ.edu', role: 'ADMIN', lastActive: '2 mins ago', status: 'Active' },
    { id: 2, name: 'Dr. Alan Turing', email: 'alan@univ.edu', role: 'COORDINATOR', lastActive: '1 hr ago', status: 'Active' },
    { id: 3, name: 'Dr. Claude Shannon', email: 'claude@univ.edu', role: 'COORDINATOR', lastActive: '5 hrs ago', status: 'Active' },
    { id: 4, name: 'John Doe', email: 'john@student.univ.edu', role: 'STUDENT', lastActive: '12 mins ago', status: 'Active' },
    { id: 5, name: 'Jane Smith', email: 'jane@student.univ.edu', role: 'STUDENT', lastActive: '2 days ago', status: 'Suspended' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Users</h1>
          <p className="text-slate-600 mt-1">Manage all accounts and roles across the platform.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm">
                <th className="p-4 font-bold text-slate-700">User</th>
                <th className="p-4 font-bold text-slate-700">Role</th>
                <th className="p-4 font-bold text-slate-700">Last Active</th>
                <th className="p-4 font-bold text-slate-700">Status</th>
                <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                        {user.role === 'ADMIN' ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center mt-0.5"><Mail className="h-3 w-3 mr-1" />{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      user.role === 'ADMIN' ? 'bg-red-50 text-red-700 border border-red-200' :
                      user.role === 'COORDINATOR' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-2" /> {user.lastActive}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                      user.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
