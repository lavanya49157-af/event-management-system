import { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminCoordinators() {
  const [coordinators, setCoordinators] = useState([
    { id: 1, name: 'Prof. Sarah Jenkins', dept: 'Computer Science', email: 'sarah.j@univ.edu', phone: '+1 234-567-8901', status: 'Active', eventsManaged: 12 },
    { id: 2, name: 'Dr. Michael Chen', dept: 'Electronics', email: 'm.chen@univ.edu', phone: '+1 234-567-8902', status: 'Active', eventsManaged: 8 },
    { id: 3, name: 'Prof. Emily Carter', dept: 'Mechanical', email: 'emily.c@univ.edu', phone: '+1 234-567-8903', status: 'Inactive', eventsManaged: 3 },
    { id: 4, name: 'Dr. Robert Wilson', dept: 'Civil', email: 'r.wilson@univ.edu', phone: '+1 234-567-8904', status: 'Active', eventsManaged: 15 },
    { id: 5, name: 'Prof. Lisa Torres', dept: 'Information Tech', email: 'lisa.t@univ.edu', phone: '+1 234-567-8905', status: 'Active', eventsManaged: 22 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSave = () => {
    setCoordinators(coordinators.map(c => c.id === editingId ? { ...c, name: editName } : c));
    setEditingId(null);
  };

  const handleToggleStatus = (id: number) => {
    setCoordinators(coordinators.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return c;
    }));
  };

  const handleDelete = (id: number) => {
    setCoordinators(coordinators.filter(c => c.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(0, ...coordinators.map(c => c.id)) + 1;
    setCoordinators([{
      id: newId,
      name: 'New Coordinator',
      dept: 'Unassigned',
      email: 'new@univ.edu',
      phone: '+1 000-000-0000',
      status: 'Active',
      eventsManaged: 0
    }, ...coordinators]);
    handleEdit(newId, 'New Coordinator');
  };

  const filtered = coordinators.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.dept.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Coordinators</h1>
          <p className="text-slate-600 mt-1">Manage departmental faculty coordinators and their access.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Coordinator
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(coord => (
          <div key={coord.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               {editingId === coord.id ? (
                 <>
                   <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:text-slate-600">
                     <XCircle className="h-4 w-4" />
                   </button>
                   <button onClick={handleSave} className="p-1 text-emerald-600 hover:text-emerald-700">
                     <CheckCircle className="h-4 w-4" />
                   </button>
                 </>
               ) : (
                 <>
                   <button onClick={() => handleEdit(coord.id, coord.name)} className="p-1 text-indigo-400 hover:text-indigo-600">
                     <Edit2 className="h-4 w-4" />
                   </button>
                   <button onClick={() => handleDelete(coord.id)} className="p-1 text-red-400 hover:text-red-600">
                     <Trash2 className="h-4 w-4" />
                   </button>
                 </>
               )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                {coord.name.charAt(coord.name.indexOf('.') + 2) || coord.name.charAt(0)}
              </div>
              <div>
                {editingId === coord.id ? (
                  <input 
                    autoFocus
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="font-bold text-slate-900 border-b border-indigo-500 focus:outline-none w-full"
                  />
                ) : (
                  <h3 className="font-bold text-slate-900">{coord.name}</h3>
                )}
                <p className="text-sm text-indigo-600 font-medium">{coord.dept} Dept</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="h-4 w-4 mr-2 text-slate-400" /> {coord.email}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-2 text-slate-400" /> {coord.phone}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-medium">Events Managed</div>
                <div className="font-bold text-slate-900">{coord.eventsManaged}</div>
              </div>
              <button 
                onClick={() => handleToggleStatus(coord.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  coord.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {coord.status}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          No coordinators found matching your search.
        </div>
      )}
    </div>
  );
}
