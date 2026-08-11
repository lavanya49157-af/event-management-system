import { X, Calendar, Clock, MapPin, Image as ImageIcon, AlignLeft, Info, Users, Monitor, Building, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  defaultCategory?: string;
}

export default function CreateEventModal({ isOpen, onClose, onSave, defaultCategory = 'General' }: CreateEventModalProps) {
  const { profile } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    day: '',
    time: '',
    location: '',
    category: defaultCategory,
    department: '',
    departmentCode: '',
    image: '',
    description: '',
    fullDetails: '',
    conducted: 'Offline',
    seats: '100'
  });

  // Role-Based Access Control logic for Department
  // In a real app, this would be tied to a rigid department ID in the user profile.
  // For the demo, we assume if you are a COORDINATOR, you belong to 'CSE' and cannot change it.
  const isCoordinator = profile?.role === 'COORDINATOR';
  const lockedDepartment = isCoordinator ? 'Computer Science & Engineering' : null;
  const lockedDepartmentCode = isCoordinator ? 'CSE' : null;

  useEffect(() => {
    if (lockedDepartment) {
      setFormData(prev => ({
        ...prev, 
        department: lockedDepartment,
        departmentCode: lockedDepartmentCode || ''
      }));
    }
  }, [lockedDepartment, lockedDepartmentCode]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const departments = [
    { name: 'Computer Science & Engineering', code: 'CSE' },
    { name: 'Information Technology', code: 'IT' },
    { name: 'Mechanical Engineering', code: 'ME' },
    { name: 'Electrical Engineering', code: 'EE' },
    { name: 'Civil Engineering', code: 'CE' },
    { name: 'Business Administration', code: 'MBA' }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create New Event</h2>
            <p className="text-sm font-medium text-slate-500">Fill in the comprehensive details for the new event.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <form id="create-event-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info Section */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info className="h-4 w-4 text-indigo-500" /> Basic Information
              </h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Event Name</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. AI & Machine Learning Workshop" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input required type="text" name="date" value={formData.date} onChange={handleChange} className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Oct 20, 2026" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Day</label>
                  <input required type="text" name="day" value={formData.day} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Tuesday" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input required type="text" name="time" value={formData.time} onChange={handleChange} className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="09:00 AM" />
                  </div>
                </div>
              </div>
            </div>

            {/* Department & Logistics (RBAC applied here) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Briefcase className="h-4 w-4 text-indigo-500" /> Department & Logistics
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Department</span>
                    {lockedDepartment && <span className="text-xs text-rose-500 font-medium bg-rose-50 px-2 py-0.5 rounded">Locked to your role</span>}
                  </label>
                  <select 
                    name="department" 
                    value={formData.department} 
                    onChange={(e) => {
                      const dept = departments.find(d => d.name === e.target.value);
                      setFormData({...formData, department: e.target.value, departmentCode: dept?.code || ''});
                    }}
                    disabled={!!lockedDepartment}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${lockedDepartment ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed' : 'bg-white border-slate-300'}`}
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.code} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">How it is conducted</label>
                  <select name="conducted" value={formData.conducted} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Offline">Offline (In-person)</option>
                    <option value="Online">Online (Virtual)</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location / Venue</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Seminar Hall 1 or Zoom Link" />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Details */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <AlignLeft className="h-4 w-4 text-indigo-500" /> Details & Media
              </h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Banner Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="/images/event-placeholder.png" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
                <input required type="text" name="description" value={formData.description} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="A brief one-line summary" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Details</label>
                <textarea required name="fullDetails" value={formData.fullDetails} onChange={handleChange} rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Provide comprehensive details about the event, speakers, agenda, etc." />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white shrink-0 flex items-center justify-end gap-3 z-10">
          <button type="button" onClick={onClose} className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" form="create-event-form" className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors">
            Create Event
          </button>
        </div>

      </div>
    </div>
  );
}
