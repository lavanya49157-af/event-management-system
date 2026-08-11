import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DashboardCalendar() {
  const [registeredDates, setRegisteredDates] = useState<number[]>([]);
  const [nextEvent, setNextEvent] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number, secs: number} | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Default to Aug 2026

  const monthStr = MONTHS[currentDate.getMonth()];
  const yearStr = currentDate.getFullYear().toString();
  const fullMonthStr = FULL_MONTHS[currentDate.getMonth()];

  useEffect(() => {
    // Read registrations from local storage
    const saved = localStorage.getItem('my_registrations');
    if (saved) {
      const regs = JSON.parse(saved);
      
      // Parse dates for the currently viewed month/year
      const monthDates = regs
        .filter((r: any) => r.date.includes(monthStr) && r.date.includes(yearStr))
        .map((r: any) => {
          const match = r.date.match(new RegExp(`${monthStr} (\\d+),`));
          return match ? parseInt(match[1]) : null;
        })
        .filter(Boolean);
        
      setRegisteredDates(monthDates);

      // Find next event (just take the first upcoming one for the timer)
      if (regs.length > 0) {
        setNextEvent(regs[regs.length - 1]);
      }
    }
  }, [currentDate]);

  // Timer logic
  useEffect(() => {
    if (!nextEvent) return;

    // Dummy timer logic that counts down from a random starting point
    // Since we don't have real Date objects for our dummy events that are easily parseable in real time,
    // we'll simulate a live countdown.
    let totalSeconds = 2 * 24 * 3600 + 14 * 3600 + 30 * 60; // 2 days, 14 hours, 30 mins

    const interval = setInterval(() => {
      totalSeconds -= 1;
      if (totalSeconds <= 0) totalSeconds = 0;
      
      const d = Math.floor(totalSeconds / (3600 * 24));
      const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      
      setTimeLeft({ days: d, hours: h, mins: m, secs: s });
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  // Calendar rendering
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="space-y-8">
      
      {/* Calendar Widget */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900">
              {fullMonthStr} {yearStr}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={prevMonth} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextMonth} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-sm">
          {blanks.map(b => <div key={`blank-${b}`} className="p-2"></div>)}
          {days.map(d => {
            const isRegistered = registeredDates.includes(d);
            return (
              <div 
                key={d} 
                className={`p-2 flex items-center justify-center rounded-lg ${
                  isRegistered 
                    ? 'bg-indigo-600 text-white font-bold shadow-md ring-2 ring-indigo-200 ring-offset-1' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </section>

      {/* Countdown Timer */}
      {nextEvent && timeLeft && (
        <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl shadow-sm border border-indigo-800 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock className="w-24 h-24" />
          </div>
          
          <h3 className="text-sm font-medium text-indigo-200 mb-1">Next Upcoming Event</h3>
          <p className="font-bold text-lg leading-tight mb-4 line-clamp-1">{nextEvent.title}</p>
          
          <div className="grid grid-cols-4 gap-2 text-center relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <span className="block text-xl font-black">{timeLeft.days}</span>
              <span className="text-[10px] uppercase font-semibold text-indigo-200">Days</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <span className="block text-xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] uppercase font-semibold text-indigo-200">Hours</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <span className="block text-xl font-black">{timeLeft.mins.toString().padStart(2, '0')}</span>
              <span className="text-[10px] uppercase font-semibold text-indigo-200">Mins</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <span className="block text-xl font-black text-emerald-400">{timeLeft.secs.toString().padStart(2, '0')}</span>
              <span className="text-[10px] uppercase font-semibold text-indigo-200">Secs</span>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
