import { useState } from 'react';
import { Calendar, Search, Filter, Plus, Edit2, Trash2, MapPin, Users } from 'lucide-react';
import { getSharedEvents, saveSharedEvents } from '../../data/mockEvents';

export default function AdminEvents() {
  const [events, setEvents] = useState(getSharedEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const handleDelete = (id: number) => {
    const updated = events.filter((e: any) => e.id !== id);
    setEvents(updated);
    saveSharedEvents(updated);
  };

  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setEditData({ ...event });
  };

  const handleSave = () => {
    const updated = events.map((e: any) => e.id === editingId ? editData : e);
    setEvents(updated);
    saveSharedEvents(updated);
    setEditingId(null);
  };

  const handleCreate = () => {
    const newId = Math.max(0, ...events.map((e: any) => e.id)) + 1;
    const newEvent = {
      id: newId,
      title: 'New Global Event',
      date: 'Oct 20, 2026',
      time: '09:00 AM',
      location: 'TBA',
      category: 'General',
      department: 'University Wide',
      departmentCode: 'UNI',
      seats: '500',
      registered: 0,
      image: '/images/conference.png',
      tags: ['New']
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    saveSharedEvents(updated);
    handleEdit(newEvent);
  };

  const filteredEvents = events.filter((e: any) => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Events</h1>
          <p className="text-slate-600 mt-1">Manage and oversee all events across the university.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Create Global Event
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search events by title or department..." 
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
                <th className="p-4 font-bold text-slate-700">Event Details</th>
                <th className="p-4 font-bold text-slate-700">Department</th>
                <th className="p-4 font-bold text-slate-700">Date & Location</th>
                <th className="p-4 font-bold text-slate-700">Registration</th>
                <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((event: any) => (
                <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-100 rounded overflow-hidden shrink-0">
                        <img src={event.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        {editingId === event.id ? (
                           <input 
                              autoFocus
                              value={editData.title} 
                              onChange={e => setEditData({...editData, title: e.target.value})}
                              className="font-bold text-slate-900 border-b border-indigo-500 focus:outline-none bg-transparent w-full" 
                           />
                        ) : (
                           <div className="font-bold text-slate-900">{event.title}</div>
                        )}
                        <div className="text-xs font-medium text-indigo-600 mt-0.5">{event.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-700">{event.department}</div>
                    <div className="text-xs text-slate-500">{event.departmentCode}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-slate-700 mb-1">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      {editingId === event.id ? (
                        <input value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="border-b border-indigo-500 focus:outline-none bg-transparent w-24" />
                      ) : (
                        <span>{event.date} • {event.time}</span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      {editingId === event.id ? (
                        <input value={editData.location} onChange={e => setEditData({...editData, location: e.target.value})} className="border-b border-indigo-500 focus:outline-none bg-transparent w-32" />
                      ) : (
                        <span>{event.location}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (event.registered / parseInt(event.seats)) * 100)}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{event.registered}/{event.seats}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    {editingId === event.id ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="text-xs font-bold text-slate-500 hover:text-slate-700 px-2 py-1">Cancel</button>
                        <button onClick={handleSave} className="text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded">Save</button>
                      </div>
                    ) : (
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(event)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No events found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
