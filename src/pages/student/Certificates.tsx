import { FileBadge, Download, Eye, Calendar, Award } from 'lucide-react';

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      event: 'AI & Machine Learning Workshop',
      issueDate: 'Jan 15, 2026',
      type: 'Participation',
      id_code: 'CERT-2026-0891'
    },
    {
      id: 2,
      event: 'Web Development Bootcamp',
      issueDate: 'Mar 22, 2026',
      type: 'Completion',
      id_code: 'CERT-2026-1102'
    },
    {
      id: 3,
      event: 'Annual CodeFest Hackathon',
      issueDate: 'Mar 28, 2026',
      type: 'Achievement (1st Place)',
      id_code: 'CERT-2026-1155'
    }
  ];

  const handleDownload = (certEvent: string) => {
    const element = document.createElement('a');
    const file = new Blob(
      [`This is a verified digital certificate for: ${certEvent}\n\nCongratulations on your achievement!`], 
      {type: 'text/plain'}
    );
    element.href = URL.createObjectURL(file);
    element.download = `${certEvent.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handlePreview = (certEvent: string) => {
    alert(`Previewing Certificate for: ${certEvent}\n\n(In a real app, this would open a PDF viewer modal)`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>
        <p className="text-slate-600 mt-1">Download and verify your digital certificates from completed events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
            {/* Certificate Thumbnail Preview */}
            <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300 via-slate-50 to-slate-50"></div>
              
              <div className="w-full h-full bg-white border border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center text-center relative">
                <FileBadge className="h-8 w-8 text-indigo-200 mb-2" />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Certificate of {cert.type.split(' ')[0]}</div>
                <div className="text-xs font-bold text-slate-800 line-clamp-2">{cert.event}</div>
                
                {/* Overlay actions on hover */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => handlePreview(cert.event)} className="p-2 bg-white rounded-full text-indigo-600 hover:scale-110 transition-transform shadow-sm" title="Preview">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDownload(cert.event)} className="p-2 bg-indigo-600 rounded-full text-white hover:scale-110 transition-transform shadow-sm" title="Download">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-base font-bold text-slate-900 mb-1">{cert.event}</h3>
              <div className="flex items-center text-sm font-medium text-indigo-600 mb-4">
                <Award className="h-4 w-4 mr-1.5" />
                {cert.type}
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {cert.issueDate}
                </span>
                <span className="font-mono text-[10px] bg-slate-100 px-2 py-1 rounded">
                  {cert.id_code}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
