import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: any;
  allEvents?: any[];
  onSelectDate?: (dateString: string) => void;
}

export default function CalendarModal({ isOpen, onClose, event, allEvents = [], onSelectDate }: CalendarModalProps) {
  // If an event is passed, default the calendar to that event's month. Otherwise use current date.
  const initialDate = event ? new Date(event.date) : new Date();
  const [currentDate, setCurrentDate] = useState(isNaN(initialDate.getTime()) ? new Date() : initialDate);

  if (!isOpen) return null;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
  const goToToday = () => setCurrentDate(new Date());
  
  // Dynamic calendar logic
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed
    
    // Get number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get the day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const startDay = new Date(year, month, 1).getDay();
    
    const calendarDays = [];
    // Previous month padding
    for (let i = 0; i < startDay; i++) {
      calendarDays.push({ empty: true });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const monthStr = currentMonthName.substring(0, 3); // e.g. "Oct"
      const paddedDay = i.toString().padStart(2, '0');
      // Common format in mock data: "Oct 20, 2026" or "Oct 20"
      const dateString1 = `${monthStr} ${paddedDay}, ${year}`;
      const dateString2 = `${monthStr} ${i}, ${year}`;
      const dateString3 = `${monthStr} ${paddedDay}`;
      const dateString4 = `${monthStr} ${i}`;
      
      let dayEvents = [];
      
      const matchEvent = (e: any) => {
        if (!e.date) return false;
        return e.date.includes(dateString1) || e.date.includes(dateString2) || e.date.includes(dateString3) || e.date.includes(dateString4);
      };

      if (event) {
        if (matchEvent(event)) dayEvents.push(event);
      } else if (allEvents.length > 0) {
        dayEvents = allEvents.filter(matchEvent);
      }

      calendarDays.push({ 
        day: i, 
        events: dayEvents, 
        isSelected: event && matchEvent(event)
      });
    }
    return calendarDays;
  };

  const calendarDays = getDaysInMonth();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] md:h-auto max-h-full">
        
        {/* Sidebar - Event Details (Only if specific event passed, or selected) */}
        {event && (
          <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col shrink-0 overflow-y-auto">
             <div className="flex justify-between items-start mb-6 md:hidden">
                <h2 className="text-xl font-bold text-slate-900">Event Details</h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-full shadow-sm">
                  <X className="h-5 w-5" />
                </button>
             </div>
             
             <div className="h-40 w-full bg-slate-200 rounded-xl overflow-hidden mb-6 shadow-sm border border-slate-200 shrink-0">
               {event.image ? (
                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-400">
                   <CalendarIcon className="h-10 w-10 opacity-50" />
                 </div>
               )}
             </div>

             <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{event.title}</h2>
             <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md mb-6">{event.category}</span>

             <div className="space-y-4 text-sm font-medium">
               <div className="flex gap-3 text-slate-700">
                 <CalendarIcon className="h-5 w-5 text-indigo-500 shrink-0" />
                 <span>{event.date}</span>
               </div>
               <div className="flex gap-3 text-slate-700">
                 <Clock className="h-5 w-5 text-indigo-500 shrink-0" />
                 <span>{event.time}</span>
               </div>
               <div className="flex gap-3 text-slate-700">
                 <MapPin className="h-5 w-5 text-indigo-500 shrink-0" />
                 <span>{event.location}</span>
               </div>
             </div>
             
             <div className="mt-8 pt-6 border-t border-slate-200">
               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors">
                 View Full Details
               </button>
             </div>
          </div>
        )}

        {/* Calendar View */}
        <div className="flex-1 p-6 flex flex-col bg-white overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
               {!event && (
                 <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden md:block">
                   <X className="h-6 w-6" />
                 </button>
               )}
               <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                 <CalendarIcon className="h-6 w-6 text-indigo-600" />
                 {currentMonthName} {currentYear}
               </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={goToToday} className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Today
              </button>
              <button onClick={nextMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
              {event && (
                <button onClick={onClose} className="p-2 ml-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden md:block">
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden shrink-0">
            {/* Days Header */}
            {days.map(day => (
              <div key={day} className="bg-slate-50 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            
            {/* Calendar Grid */}
            {calendarDays.map((d, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (!d.empty && d.day !== undefined && onSelectDate) {
                    const paddedDay = d.day.toString().padStart(2, '0');
                    const monthStr = currentMonthName.substring(0, 3);
                    onSelectDate(`${monthStr} ${paddedDay}, ${currentYear}`);
                  }
                }}
                className={`min-h-[100px] bg-white p-2 transition-colors ${d.isSelected ? 'bg-indigo-50/50 ring-2 ring-indigo-500 ring-inset z-10' : ''} ${d.events?.length ? 'hover:bg-slate-50' : ''} ${onSelectDate && !d.empty ? 'cursor-pointer hover:bg-indigo-50' : ''} ${!onSelectDate && d.events?.length ? 'cursor-pointer' : ''}`}
              >
                {!d.empty && (
                  <>
                    <div className={`text-sm font-bold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${d.isSelected ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}>
                      {d.day}
                    </div>
                    <div className="space-y-1">
                      {d.events?.map((ev: any, evIdx: number) => (
                        <div key={evIdx} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded truncate border border-indigo-200" title={ev.title}>
                          {ev.time.split(' ')[0]} {ev.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
