import { Trophy, Medal, Star, Award, ChevronRight, X, Calendar, MapPin, CheckCircle2, FileBadge } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Achievements() {
  const { profile } = useAuth();
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const achievements = [
    {
      id: 1,
      title: 'Hackathon 2025 Winner',
      event: 'Annual CodeFest',
      date: 'March 2025',
      type: '1st Place',
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      badge: 'bg-yellow-500'
    },
    {
      id: 2,
      title: 'Technical Quiz Runner Up',
      event: 'TechWeek Quiz 2025',
      date: 'April 2025',
      type: '2nd Place',
      icon: <Medal className="h-8 w-8 text-slate-400" />,
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      badge: 'bg-slate-400'
    },
    {
      id: 3,
      title: 'Top Performer',
      event: 'AI & ML Workshop',
      date: 'January 2026',
      type: 'Excellence',
      icon: <Star className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      badge: 'bg-amber-500'
    },
    {
      id: 4,
      title: 'Best Design Concept',
      event: 'UI/UX Hack',
      date: 'June 2026',
      type: 'Special Mention',
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      badge: 'bg-indigo-500'
    }
  ];

  const handleDownload = (achievement: any) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw decorative border
    ctx.strokeStyle = '#4f46e5'; // Indigo 600
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 760, 560);
    ctx.strokeStyle = '#e2e8f0'; 
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 520);
    
    // Draw Header
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px "Inter", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 400, 140);
    
    // Draw Body
    ctx.font = '22px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('This certificate is proudly presented to', 400, 230);
    
    // Draw Name
    ctx.font = 'bold 38px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(profile?.full_name || 'Demo Student', 400, 290);
    
    // Draw line under name
    ctx.beginPath();
    ctx.moveTo(250, 310);
    ctx.lineTo(550, 310);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw Reason
    ctx.font = '22px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('for successfully achieving', 400, 360);
    
    // Draw Achievement Title
    ctx.font = 'bold 32px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#4f46e5';
    ctx.fillText(achievement.title, 400, 420);
    
    // Draw Date and Event
    ctx.fillStyle = '#64748b';
    ctx.font = '18px "Inter", Arial, sans-serif';
    ctx.fillText(`${achievement.type} • ${achievement.event} • ${achievement.date}`, 400, 460);
    
    // Draw Footer / Stamp
    ctx.font = 'italic 16px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Official Credential Issued by EventHub Authority', 400, 530);
    
    // Trigger Download
    const link = document.createElement('a');
    link.download = `${achievement.title.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Achievements</h1>
          <p className="text-slate-600 mt-1">A showcase of your awards, honors, and recognitions from campus events.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Trophy className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Total Score</div>
            <div className="text-xl font-black text-slate-900">1,250 <span className="text-sm font-medium text-slate-400">pts</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className={`bg-white rounded-2xl shadow-sm border ${ach.color.split(' ')[1]} p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
            {/* Background Decoration */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${ach.badge}`}></div>
            
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-xl flex-shrink-0 ${ach.color}`}>
                {ach.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider text-white ${ach.badge}`}>
                    {ach.type}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{ach.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{ach.title}</h3>
                <p className="text-sm font-medium text-slate-600">{ach.event}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => setSelectedAchievement(ach)}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center group-hover:translate-x-1 transition-transform"
              >
                View Details <ChevronRight className="h-4 w-4 ml-0.5" />
              </button>
              <button className="text-sm text-slate-500 hover:text-slate-700 font-medium">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Slide-over Panel */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedAchievement(null)}
          ></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
            <div className={`p-8 ${selectedAchievement.color.split(' ')[0]} border-b border-slate-100 relative`}>
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                {selectedAchievement.icon}
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${selectedAchievement.badge}`}>
                {selectedAchievement.type}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mb-1">{selectedAchievement.title}</h2>
              <p className="text-slate-700 font-medium">{selectedAchievement.event}</p>
            </div>
            
            <div className="p-8 space-y-8">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Achievement Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Date Awarded</div>
                      <div className="text-sm text-slate-500">{selectedAchievement.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Event Type</div>
                      <div className="text-sm text-slate-500">Campus Official Event</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Verified Credentials</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Credential ID</span>
                    <span className="text-sm font-mono font-medium text-slate-900">
                      CRED-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Issued By</span>
                    <span className="text-sm font-medium text-slate-900">EventHub Authority</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Verification</span>
                    <span className="inline-flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Verified
                    </span>
                  </div>
                </div>
              </section>
              
              <div className="pt-4">
                <button 
                  onClick={() => handleDownload(selectedAchievement)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm shadow-indigo-200 transition-colors flex items-center justify-center"
                >
                  <FileBadge className="h-5 w-5 mr-2" />
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
