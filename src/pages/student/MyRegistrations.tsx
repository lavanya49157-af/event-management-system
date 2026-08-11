import { Calendar, MapPin, CheckCircle2, Clock, XCircle, ArrowRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import QRCode from 'react-qr-code';

export default function MyRegistrations() {
  const initialRegistrations = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      date: 'Aug 20, 2026',
      time: '10:00 AM',
      location: 'Seminar Hall 1, CSE Block',
      status: 'Confirmed',
      image: '/images/ai_workshop.png',
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      date: 'Aug 28, 2026',
      time: '09:00 AM',
      location: 'Lab 4, IT Block',
      status: 'Confirmed',
      image: '/images/web_bootcamp.png',
    },
    {
      id: 3,
      title: 'Campus Photography Walk',
      date: 'Sep 05, 2026',
      time: '04:30 PM',
      location: 'Main Gate',
      status: 'Pending',
      image: '/images/photography.png',
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 className="h-4 w-4 mr-1.5" />;
      case 'Pending': return <Clock className="h-4 w-4 mr-1.5" />;
      default: return <XCircle className="h-4 w-4 mr-1.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-rose-700 bg-rose-50 border-rose-200';
    }
  };

  const { profile } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [syncedCalendars, setSyncedCalendars] = useState<{[key: number]: boolean}>({});
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('my_registrations');
    if (saved) {
      setRegistrations(JSON.parse(saved));
    } else {
      localStorage.setItem('my_registrations', JSON.stringify(initialRegistrations));
      setRegistrations(initialRegistrations);
    }
  }, []);

  const handleAddToCalendar = (id: number, title: string) => {
    setSyncedCalendars(prev => ({ ...prev, [id]: true }));
    alert(`${title} is synced with your Dashboard Calendar!`);
  };

  const handleCancel = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      const updated = registrations.filter(r => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('my_registrations', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Registrations</h1>
        <p className="text-slate-600 mt-1">Manage the events you are currently registered for.</p>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div key={reg.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-48 h-32 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={reg.image} alt={reg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{reg.title}</h3>
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md border ${getStatusColor(reg.status)}`}>
                      {getStatusIcon(reg.status)}
                      {reg.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {reg.date} • {reg.time}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {reg.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleAddToCalendar(reg.id, reg.title)} 
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center ${
                      syncedCalendars[reg.id] 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {syncedCalendars[reg.id] ? (
                      <><CheckCircle2 className="h-4 w-4 mr-1.5" /> Synced to Calendar</>
                    ) : 'Add to Calendar'}
                  </button>
                  <button onClick={() => setSelectedTicket(reg)} className="text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors flex items-center">
                    View Ticket <ArrowRight className="h-4 w-4 ml-1.5" />
                  </button>
                  <button onClick={() => handleCancel(reg.id)} className="text-sm font-medium text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors ml-auto">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-indigo-600 p-6 text-white relative">
              <button 
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="uppercase text-indigo-200 text-xs font-bold tracking-wider mb-2">Admit One</div>
              <h3 className="text-2xl font-black mb-1 leading-tight">{selectedTicket.title}</h3>
              <p className="text-indigo-100 font-medium">{profile?.full_name || 'Demo Student'}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-slate-700">
                  <Calendar className="h-5 w-5 mr-3 text-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Date & Time</div>
                    <div className="font-medium text-sm">{selectedTicket.date} • {selectedTicket.time}</div>
                  </div>
                </div>
                <div className="flex items-center text-slate-700">
                  <MapPin className="h-5 w-5 mr-3 text-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Location</div>
                    <div className="font-medium text-sm">{selectedTicket.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-dashed border-slate-300 pt-6 flex flex-col items-center justify-center relative">
                <div className="absolute -top-3 -left-9 w-6 h-6 bg-slate-900/50 rounded-full"></div>
                <div className="absolute -top-3 -right-9 w-6 h-6 bg-slate-900/50 rounded-full"></div>
                
                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <QRCode 
                    value={JSON.stringify({
                      id: selectedTicket.id,
                      event: selectedTicket.title,
                      name: profile?.full_name || 'Demo Student',
                      status: 'CONFIRMED'
                    })} 
                    size={128} 
                    level="Q"
                  />
                </div>
                <div className="mt-4 text-xs font-mono text-slate-500 tracking-widest">{selectedTicket.id}-TKT-{Math.floor(Math.random()*10000).toString().padStart(4, '0')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
