import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SavedEvents() {
  const navigate = useNavigate();
  const initialSavedEvents = [
    {
      id: 1,
      title: 'UI/UX Design Masterclass',
      date: 'Sep 12, 2026',
      time: '02:00 PM',
      location: 'Design Studio',
      category: 'Workshop',
      image: '/images/ui_design.png',
    },
    {
      id: 2,
      title: 'Robotics Exhibition 2026',
      date: 'Oct 05, 2026',
      time: '10:00 AM',
      location: 'Main Hall',
      category: 'Exhibition',
      image: '/images/robotics.png',
    }
  ];

  const [savedEvents, setSavedEvents] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('my_saved_events');
    if (saved) {
      setSavedEvents(JSON.parse(saved));
    } else {
      localStorage.setItem('my_saved_events', JSON.stringify(initialSavedEvents));
      setSavedEvents(initialSavedEvents);
    }
  }, []);

  const handleRemoveSaved = (id: number) => {
    const updated = savedEvents.filter(e => e.id !== id);
    setSavedEvents(updated);
    localStorage.setItem('my_saved_events', JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Saved Events</h1>
        <p className="text-slate-600 mt-1">Events you have bookmarked for later.</p>
      </div>

      {savedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="h-40 w-full relative overflow-hidden bg-slate-100">
                <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
                  {event.category}
                </div>
                <button 
                  onClick={() => handleRemoveSaved(event.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-rose-500 hover:text-rose-600 hover:bg-white shadow-sm transition-colors z-10"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                    {event.location}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button onClick={() => navigate(`/student/explore/${event.id}?register=true`)} className="w-full flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-lg transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
          <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No saved events</h3>
          <p className="text-slate-500 mb-6">You haven't bookmarked any events yet. Explore upcoming events to save them here.</p>
          <Link to="/student/explore" className="btn-primary">
            Explore Events
          </Link>
        </div>
      )}
    </div>
  );
}
