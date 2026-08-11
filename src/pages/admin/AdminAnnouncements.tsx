import { useState } from 'react';
import { Bell, Plus, Trash2, Send, Clock, User } from 'lucide-react';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Server Maintenance Scheduled', message: 'The event registration system will be down for maintenance from 2 AM to 4 AM EST.', date: 'Just now', author: 'System Admin', type: 'System' },
    { id: 2, title: 'Hackathon 2026 Registration Open!', message: 'Encourage students to register for the upcoming global hackathon.', date: '2 hours ago', author: 'CSE Dept', type: 'Event' },
    { id: 3, title: 'New Faculty Guidelines', message: 'Please review the updated guidelines for hosting departmental events in the new academic year.', date: '1 day ago', author: 'Dean of Students', type: 'Important' },
  ]);

  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-600 mt-1">Broadcast messages and alerts to students and faculty.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> New Announcement
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8 animate-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Create Announcement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
              <input type="text" placeholder="Announcement Title" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
              <textarea rows={4} placeholder="Type your message here..." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsCreating(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setIsCreating(false)} className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors">
                <Send className="h-4 w-4 mr-2" /> Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4 group">
            <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-900 text-lg">{ann.title}</h3>
                <button 
                  onClick={() => setAnnouncements(announcements.filter(a => a.id !== ann.id))}
                  className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-slate-600 mb-4">{ann.message}</p>
              
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> {ann.author}</span>
                <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {ann.date}</span>
                <span className="bg-slate-100 px-2 py-1 rounded-md">{ann.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
