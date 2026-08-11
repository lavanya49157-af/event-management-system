import { useState, useEffect } from 'react';
import { Search, Filter, Mail, BookOpen, Download, User as UserIcon, X, Calendar, MapPin } from 'lucide-react';

export default function AdminParticipants() {
  const [participants, setParticipants] = useState([
    { id: 'STU001', name: 'John Doe', dept: 'CSE', year: '3rd Year', email: 'john.d@student.univ.edu', registeredEvents: 4, status: 'Active' },
    { id: 'STU002', name: 'Alice Smith', dept: 'ECE', year: '2nd Year', email: 'alice.s@student.univ.edu', registeredEvents: 2, status: 'Active' },
    { id: 'STU003', name: 'Robert Johnson', dept: 'MECH', year: '4th Year', email: 'robert.j@student.univ.edu', registeredEvents: 1, status: 'Active' },
    { id: 'STU004', name: 'Emily Davis', dept: 'IT', year: '1st Year', email: 'emily.d@student.univ.edu', registeredEvents: 5, status: 'Active' },
    { id: 'STU005', name: 'Michael Brown', dept: 'CIVIL', year: '3rd Year', email: 'michael.b@student.univ.edu', registeredEvents: 3, status: 'Active' },
    { id: 'STU006', name: 'Jessica Wilson', dept: 'CSE', year: '4th Year', email: 'jessica.w@student.univ.edu', registeredEvents: 0, status: 'Inactive' },
  ]);

  useEffect(() => {
    // Check for a newly registered student in localStorage and add them to the list
    const savedProfile = localStorage.getItem('demo_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.role === 'STUDENT') {
          // Get the number of registrations from localStorage
          const savedRegs = JSON.parse(localStorage.getItem('my_registrations') || '[]');
          const regCount = savedRegs.length;

          setParticipants(prev => {
            // Check if they are already in the list to prevent Strict Mode duplicates
            if (prev.some(p => p.email === profile.email)) {
              // Also update the reg count if they already exist
              return prev.map(p => p.email === profile.email ? { ...p, registeredEvents: regCount } : p);
            }
            
            const newStudent = {
              id: 'STU' + Math.floor(Math.random() * 900 + 100).toString(),
              name: profile.full_name,
              dept: profile.department,
              year: profile.year || 'N/A',
              email: profile.email,
              registeredEvents: regCount,
              status: profile.is_active ? 'Active' : 'Inactive'
            };
            return [newStudent, ...prev];
          });
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<typeof participants[0] | null>(null);

  const filtered = participants.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Department', 'Year', 'Email', 'Registered Events', 'Status'],
      ...participants.map(p => [p.id, p.name, p.dept, p.year, p.email, p.registeredEvents, p.status])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'participants_export.csv';
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registered Participants</h1>
          <p className="text-slate-600 mt-1">View and manage student registrations across all events.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold rounded-lg shadow-sm transition-colors"
        >
          <Download className="h-4 w-4 mr-2" /> Export Data
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by student name, ID or department..." 
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
                <th className="p-4 font-bold text-slate-700">Student Info</th>
                <th className="p-4 font-bold text-slate-700">Contact</th>
                <th className="p-4 font-bold text-slate-700">Academic Details</th>
                <th className="p-4 font-bold text-slate-700 text-center">Registrations</th>
                <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-xs font-medium text-slate-500">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="h-4 w-4 mr-2 text-slate-400 shrink-0" /> {student.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-slate-700 mb-1">
                      <BookOpen className="h-4 w-4 mr-2 text-slate-400 shrink-0" /> {student.dept}
                    </div>
                    <div className="text-xs text-slate-500 ml-6">{student.year}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${
                      student.registeredEvents > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {student.registeredEvents}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedParticipant(student)}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No participants found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Profile Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedParticipant(null)} />
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
              <button 
                onClick={() => setSelectedParticipant(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 w-24 h-24 mx-auto rounded-full border-4 border-white bg-slate-100 shadow-md flex items-center justify-center overflow-hidden mb-4">
                <UserIcon className="h-12 w-12 text-slate-400" />
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">{selectedParticipant.name}</h2>
                <p className="text-sm font-medium text-indigo-600 mb-2">{selectedParticipant.id}</p>
                <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${selectedParticipant.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                  {selectedParticipant.status} Student
                </span>
              </div>
              
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start text-sm">
                    <Mail className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-700 break-all">{selectedParticipant.email}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <BookOpen className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-700">{selectedParticipant.dept}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-700">{selectedParticipant.year}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Filter className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-700">{selectedParticipant.registeredEvents} Registrations</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedParticipant(null)}
                  className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
