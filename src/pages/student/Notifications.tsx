import { Bell, Calendar, CheckCircle2, AlertCircle, Info, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const savedRegs = localStorage.getItem('my_registrations');
    const readNotesStr = localStorage.getItem('read_notifications');
    const readNotes = readNotesStr ? JSON.parse(readNotesStr) : [];
    
    let dynamicNotes: any[] = [];
    
    if (savedRegs) {
      const regs = JSON.parse(savedRegs);
      
      regs.forEach((reg: any, index: number) => {
        const id = `reg-${reg.id}`;
        dynamicNotes.push({
          id,
          title: 'Registration Confirmed',
          message: `Your registration for ${reg.title} is confirmed.`,
          time: 'Just now',
          type: 'success',
          isUnread: !readNotes.includes(id),
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
          bg: 'bg-emerald-50 border-emerald-100'
        });
      });

      // Generate timer reminder for next event
      if (regs.length > 0) {
        const nextEvent = regs[regs.length - 1]; 
        const id = `rem-${nextEvent.id}`;
        dynamicNotes.push({
          id,
          title: 'Event Reminder',
          message: `${nextEvent.title} is coming up at ${nextEvent.time}!`,
          time: '1 min ago',
          type: 'info',
          isUnread: !readNotes.includes(id),
          icon: <Calendar className="h-5 w-5 text-blue-600" />,
          bg: 'bg-blue-50 border-blue-100'
        });
      }
    }

    const staticNotes = [
      {
        id: 3,
        title: 'Certificate Available',
        message: 'Your certificate for Annual CodeFest Hackathon is now available for download.',
        time: 'Yesterday',
        type: 'success',
        isUnread: !readNotes.includes(3),
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
        bg: 'bg-emerald-50 border-emerald-100'
      },
      {
        id: 4,
        title: 'Action Required',
        message: 'Please complete your profile information to register for the upcoming Sports Meet.',
        time: '2 days ago',
        type: 'warning',
        isUnread: !readNotes.includes(4),
        icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
        bg: 'bg-amber-50 border-amber-100'
      },
      {
        id: 5,
        title: 'System Update',
        message: 'EventHub will be undergoing maintenance on Saturday from 2 AM to 4 AM.',
        time: 'Last week',
        type: 'default',
        isUnread: !readNotes.includes(5),
        icon: <Info className="h-5 w-5 text-slate-600" />,
        bg: 'bg-slate-50 border-slate-200'
      }
    ];

    setNotifications([...dynamicNotes.reverse(), ...staticNotes]);
  }, []);

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    localStorage.setItem('read_notifications', JSON.stringify(allIds));
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-1">Stay updated with your event registrations and announcements.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notifications.map((note) => (
            <div key={note.id} className={`p-5 flex gap-4 hover:bg-slate-50 transition-colors relative ${note.isUnread ? 'bg-indigo-50/30' : ''}`}>
              {note.isUnread && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
              )}
              
              <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 border ${note.bg}`}>
                {note.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-bold ${note.isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
                    {note.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">{note.time}</span>
                </div>
                <p className={`text-sm ${note.isUnread ? 'text-slate-700 font-medium' : 'text-slate-600'}`}>
                  {note.message}
                </p>
              </div>
              
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 self-start">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
