import { Building2, Users, Calendar, Plus, MoreVertical, X, Image as ImageIcon, Settings, ChevronRight, ShieldAlert } from 'lucide-react';
import { useState, useRef } from 'react';
import { getSharedEvents, saveSharedEvents } from '../../data/mockEvents';
import { useAuth } from '../../context/AuthContext';

export default function AdminDepartments() {
  const initialDepartments = [
    { id: 1, name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Alan Turing', events: 45, students: 1200, active: true },
    { id: 2, name: 'Electronics & Communication', code: 'ECE', head: 'Dr. Claude Shannon', events: 32, students: 850, active: true },
    { id: 3, name: 'Mechanical Engineering', code: 'MECH', head: 'Dr. Henry Ford', events: 24, students: 600, active: true },
    { id: 4, name: 'Civil Engineering', code: 'CIVIL', head: 'Dr. Karl Terzaghi', events: 18, students: 450, active: true },
    { id: 5, name: 'Information Technology', code: 'IT', head: 'Dr. Ada Lovelace', events: 40, students: 1000, active: true }
  ];

  const [depts, setDepts] = useState(initialDepartments);
  const [selectedDept, setSelectedDept] = useState<typeof initialDepartments[0] | null>(null);
  const [allEvents, setAllEvents] = useState(getSharedEvents());
  const { profile } = useAuth();
  // Authorization check: Admin can only manage their own department
  const userDept = (profile as any)?.department;
  const isCseAdmin = userDept === 'CSE';
  
  const canManageDept = selectedDept ? (!userDept || selectedDept.code === userDept) : false;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [manageId, setManageId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  
  const [manageAdminDeptId, setManageAdminDeptId] = useState<number | null>(null);
  const [editAdminName, setEditAdminName] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEventId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        const updatedEvents = allEvents.map((ev: any) => 
          ev.id === editingEventId ? { ...ev, image: base64String } : ev
        );
        
        setAllEvents(updatedEvents);
        saveSharedEvents(updatedEvents);
        setEditingEventId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMediaClick = (eventId: number) => {
    setEditingEventId(eventId);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 10);
  };

  const handleSaveManage = () => {
    if (!manageId) return;
    const updatedEvents = allEvents.map((ev: any) => 
      ev.id === manageId ? { ...ev, title: editTitle } : ev
    );
    setAllEvents(updatedEvents);
    saveSharedEvents(updatedEvents);
    setManageId(null);
  };

  const handleCreateNew = () => {
    if (!selectedDept) return;
    const newId = Math.max(0, ...allEvents.map((e: any) => e.id)) + 1;
    const newEvent = {
      id: newId,
      title: 'New Event Title',
      date: 'Oct 15, 2026',
      time: '10:00 AM',
      location: 'TBA',
      category: 'General',
      department: selectedDept.name,
      departmentCode: selectedDept.code,
      seats: '100',
      registered: 0,
      image: '/images/workshop.png',
      tags: ['New']
    };
    const updated = [...allEvents, newEvent];
    setAllEvents(updated);
    saveSharedEvents(updated);
    
    // Automatically open manage mode for the new event
    setManageId(newId);
    setEditTitle(newEvent.title);
  };

  const deptEvents = selectedDept ? allEvents.filter((e: any) => e.departmentCode === selectedDept.code || e.department.includes(selectedDept.code)) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Departments</h1>
          <p className="text-gray-600 text-xs mt-1">JNTU-GV Vizianagaram department overview and event coordinators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {depts.map(dept => (
           <div key={dept.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                 <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                 </div>
                 <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical className="h-5 w-5" />
                 </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{dept.name}</h3>
              <p className="text-sm font-bold text-indigo-600 mb-4">{dept.code} Department</p>
              
              <div className="pt-4 border-t border-slate-100 space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center font-medium"><Users className="h-4 w-4 mr-2" /> Head of Dept</span>
                    {manageAdminDeptId === dept.id ? (
                      <input 
                        type="text"
                        value={editAdminName}
                        onChange={(e) => setEditAdminName(e.target.value)}
                        className="w-32 text-sm font-bold text-slate-900 border border-indigo-300 rounded px-1 text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        autoFocus
                      />
                    ) : (
                      <span className="font-bold text-slate-900">{dept.head}</span>
                    )}
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center font-medium"><Users className="h-4 w-4 mr-2" /> Students</span>
                    <span className="font-bold text-slate-900">{dept.students}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center font-medium"><Calendar className="h-4 w-4 mr-2" /> Total Events</span>
                    <span className="font-bold text-slate-900">{dept.events}</span>
                 </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                 <button 
                    onClick={() => setSelectedDept(dept)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold py-2 rounded-lg transition-colors border border-slate-200"
                 >
                    View Details
                 </button>
                 {manageAdminDeptId === dept.id ? (
                   <>
                     <button 
                        onClick={() => { setManageAdminDeptId(null); }}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-bold py-2 rounded-lg transition-colors border border-red-100"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={() => {
                          setDepts(depts.map(d => d.id === dept.id ? { ...d, head: editAdminName } : d));
                          setManageAdminDeptId(null);
                        }}
                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold py-2 rounded-lg transition-colors border border-emerald-100"
                     >
                        Save Admin
                     </button>
                   </>
                 ) : (
                   <button 
                      onClick={() => { setManageAdminDeptId(dept.id); setEditAdminName(dept.head); }}
                      className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold py-2 rounded-lg transition-colors border border-indigo-100"
                   >
                      Manage Admin
                   </button>
                 )}
              </div>
           </div>
        ))}
      </div>

      {/* Slide-over Panel for Department Details */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedDept(null)} />
          <div className="fixed inset-y-0 right-0 max-w-xl w-full flex">
            <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedDept.name}</h2>
                    <p className="text-sm font-medium text-indigo-600">{selectedDept.code} Events & Management</p>
                  </div>
                </div>
                <button onClick={() => setSelectedDept(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50">
                {/* Department Stats Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-medium text-slate-500 mb-1">Active Events</div>
                    <div className="text-2xl font-bold text-slate-900">{selectedDept.events}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-medium text-slate-500 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold text-slate-900">{selectedDept.students}</div>
                  </div>
                </div>

                {/* Specific Department Events */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-slate-900">Department Events</h3>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</button>
                  </div>
                  <div className="space-y-3">
                    {deptEvents.length === 0 ? (
                      <div className="text-sm text-slate-500 bg-white p-4 rounded-xl border border-slate-200 text-center">No active events for this department.</div>
                    ) : deptEvents.map((event: any) => (
                      <div key={event.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center group hover:border-indigo-300 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-12 w-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                             <img src={event.image} alt="Event" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 w-full">
                            {manageId === event.id ? (
                              <input 
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full text-sm font-bold text-slate-900 border border-indigo-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                autoFocus
                              />
                            ) : (
                              <div className="font-bold text-slate-900 line-clamp-1">{event.title}</div>
                            )}
                            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                              <Calendar className="h-3.5 w-3.5" /> {event.date} • {event.registered} Registered
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                          {manageId === event.id ? (
                            <>
                              <button 
                                onClick={() => {
                                  const updated = allEvents.filter((ev: any) => ev.id !== event.id);
                                  setAllEvents(updated);
                                  saveSharedEvents(updated);
                                  setManageId(null);
                                }}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg border border-red-100 transition-colors"
                              >
                                <span>Cancel Event</span>
                              </button>
                              <button 
                                onClick={handleSaveManage}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-100 transition-colors"
                              >
                                <span>Save</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleAddMediaClick(event.id)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                              >
                                <ImageIcon className="h-4 w-4 text-slate-400" />
                                <span>Add Media</span>
                              </button>
                              <button 
                                onClick={() => { setManageId(event.id); setEditTitle(event.title); }}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100 transition-colors"
                              >
                                <Settings className="h-4 w-4 text-indigo-500" />
                                <span>Manage</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Hidden file input for media upload */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              <div className="p-4 border-t border-slate-200 bg-white">
                <button 
                  onClick={handleCreateNew}
                  disabled={!canManageDept}
                  className={`w-full flex items-center justify-center px-4 py-3 font-bold rounded-xl shadow-sm transition-colors ${
                    canManageDept 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {canManageDept ? (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Create New {selectedDept.code} Event
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-5 w-5 mr-2" />
                      Not Authorized for {selectedDept.code}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
