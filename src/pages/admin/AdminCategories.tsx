import { useState } from 'react';
import { Plus, Tag, Edit2, Trash2, CheckCircle, XCircle, X, Calendar as CalendarIcon, Settings, Image as ImageIcon, MapPin, Clock } from 'lucide-react';
import { getSharedEvents, saveSharedEvents } from '../../data/mockEvents';
import CalendarModal from '../../components/common/CalendarModal';
import CreateEventModal from '../../components/common/CreateEventModal';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Workshop', date: 'Oct 20, 2026', time: '10:00 AM', color: 'bg-blue-100 text-blue-700 border-blue-200', count: 24, description: 'Interactive learning sessions.' },
    { id: 2, name: 'Seminar', date: 'Oct 22, 2026', time: '02:00 PM', color: 'bg-purple-100 text-purple-700 border-purple-200', count: 18, description: 'Expert talks and presentations.' },
    { id: 3, name: 'Competition', date: 'Nov 05, 2026', time: '09:00 AM', color: 'bg-rose-100 text-rose-700 border-rose-200', count: 35, description: 'Hackathons and challenges.' },
    { id: 4, name: 'Cultural', date: 'Nov 12, 2026', time: '06:00 PM', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', count: 12, description: 'Festivals, music, and arts.' },
    { id: 5, name: 'Sports', date: 'Nov 15, 2026', time: '08:00 AM', color: 'bg-amber-100 text-amber-700 border-amber-200', count: 42, description: 'Athletic events and matches.' },
    { id: 6, name: 'Conference', date: 'Dec 01, 2026', time: '10:00 AM', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', count: 8, description: 'Large-scale academic gatherings.' }
  ]);

  const [allEvents, setAllEvents] = useState(getSharedEvents());
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  
  // Event Management State
  const [manageId, setManageId] = useState<number | null>(null);
  const [editEventData, setEditEventData] = useState({ title: '', date: '', time: '' });

  // Calendar Modal State
  const [selectedEventForCalendar, setSelectedEventForCalendar] = useState<any>(null);
  const [datePickerTarget, setDatePickerTarget] = useState<'category' | 'event' | null>(null);
  
  // Advanced Event Creation State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const catEvents = selectedCategory ? allEvents.filter((e: any) => e.category === selectedCategory.name || e.tags.includes(selectedCategory.name)) : [];

  const handleSaveEvent = () => {
    if (!manageId) return;
    const updated = allEvents.map((ev: any) => 
      ev.id === manageId ? { ...ev, title: editEventData.title, date: editEventData.date, time: editEventData.time } : ev
    );
    setAllEvents(updated);
    saveSharedEvents(updated);
    setManageId(null);
  };

  const handleAdvancedCreate = (formData: any) => {
    if (!selectedCategory) return;
    const newId = Math.max(0, ...allEvents.map((e: any) => e.id)) + 1;
    const newEvent = {
      id: newId,
      ...formData,
      category: selectedCategory.name,
      tags: [selectedCategory.name],
      image: formData.image || '/images/workshop.png',
      registered: 0
    };
    const updated = [...allEvents, newEvent];
    setAllEvents(updated);
    saveSharedEvents(updated);
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDate(cat.date || '');
    setEditTime(cat.time || '');
  };

  const handleSave = (id: number) => {
    setCategories(categories.map(c => c.id === id ? { ...c, name: editName, date: editDate, time: editTime } : c));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    const newCat = {
      id: newId,
      name: 'New Event/Category',
      date: 'Oct 25, 2026',
      time: '10:00 AM',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      count: 0,
      description: 'A new event category.'
    };
    setCategories([...categories, newCat]);
    handleEdit(newCat);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Categories</h1>
          <p className="text-slate-600 mt-1">Manage categories used for organizing and filtering events.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group relative">
            <div className="flex justify-between items-start mb-4">
               <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${cat.color}`}>
                  <Tag className="h-6 w-6" />
               </div>
               <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-20">
                 {editingId === cat.id ? (
                   <>
                     <button onClick={() => handleSave(cat.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="h-4 w-4" /></button>
                     <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded"><XCircle className="h-4 w-4" /></button>
                   </>
                 ) : (
                   <>
                     <button onClick={() => handleEdit(cat)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded"><Edit2 className="h-4 w-4" /></button>
                     <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
                   </>
                 )}
               </div>
            </div>
            
            {editingId === cat.id ? (
              <div className="space-y-2 mb-4 relative z-20">
                <input 
                  autoFocus
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Event / Category Name"
                  className="text-xl font-bold text-slate-900 border-b-2 border-indigo-500 focus:outline-none w-full bg-transparent"
                />
                <div className="flex gap-2">
                  <div className="relative w-1/2">
                    <input 
                      readOnly
                      value={editDate}
                      onClick={() => setDatePickerTarget('category')}
                      placeholder="Date"
                      className="text-sm font-medium text-slate-700 border-b border-indigo-500 focus:outline-none w-full bg-transparent cursor-pointer"
                    />
                    <CalendarIcon className="absolute right-0 bottom-1 h-3.5 w-3.5 text-indigo-400 pointer-events-none" />
                  </div>
                  <input 
                    type="time"
                    value={editTime}
                    onChange={e => setEditTime(e.target.value)}
                    placeholder="Time"
                    className="text-sm font-medium text-slate-700 border-b border-indigo-500 focus:outline-none w-1/2 bg-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                {(cat.date || cat.time) && (
                  <div className="text-sm font-medium text-indigo-600 flex items-center gap-2 mb-2">
                    {cat.date && <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1" /> {cat.date}</span>}
                    {cat.time && <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {cat.time}</span>}
                  </div>
                )}
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Active Events</span>
              <span className="text-lg font-bold text-slate-900">{cat.count}</span>
            </div>
            
            {/* Click overlay */}
            <div 
              className="absolute inset-0 cursor-pointer rounded-2xl z-0"
              onClick={() => { if (editingId !== cat.id) setSelectedCategory(cat); }}
            />
            <div className="relative z-10 pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-indigo-100 transition-all"></div>
          </div>
        ))}
      </div>

      {/* Slide-over Panel for Category Details */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCategory(null)} />
          <div className="fixed inset-y-0 right-0 max-w-xl w-full flex">
            <div className="w-full h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${selectedCategory.color}`}>
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedCategory.name} Events</h2>
                    <p className="text-sm font-medium text-slate-500">{selectedCategory.description}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-bold text-slate-900">Events in Category</h3>
                  <span className="text-sm font-bold text-indigo-600">{catEvents.length} Events</span>
                </div>
                
                <div className="space-y-3">
                  {catEvents.length === 0 ? (
                    <div className="text-sm text-slate-500 bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
                      No active events found for this category.
                    </div>
                  ) : catEvents.map((event: any) => (
                    <div key={event.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center group hover:border-indigo-300 transition-colors">
                      <div className="flex items-center gap-4 flex-1 w-full">
                        <div className="h-16 w-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 hidden sm:block">
                           <img src={event.image} alt="Event" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 w-full space-y-2">
                          {manageId === event.id ? (
                            <div className="space-y-2">
                              <input 
                                type="text"
                                value={editEventData.title}
                                onChange={(e) => setEditEventData({...editEventData, title: e.target.value})}
                                className="w-full text-sm font-bold text-slate-900 border border-indigo-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Event Name"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <div className="relative w-1/2">
                                  <input 
                                    readOnly
                                    value={editEventData.date}
                                    onClick={() => setDatePickerTarget('event')}
                                    className="w-full text-sm text-slate-700 border border-indigo-300 rounded px-2 py-1 pr-7 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                    placeholder="Date"
                                  />
                                  <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                                </div>
                                <input 
                                  type="time"
                                  value={editEventData.time}
                                  onChange={(e) => setEditEventData({...editEventData, time: e.target.value})}
                                  className="w-1/2 text-sm text-slate-700 border border-indigo-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                  placeholder="Time"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="font-bold text-slate-900 line-clamp-1">{event.title}</div>
                              <div className="text-sm text-slate-500 flex flex-wrap items-center gap-3">
                                <span className="flex items-center"><CalendarIcon className="h-3.5 w-3.5 mr-1" /> {event.date}</span>
                                <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {event.time}</span>
                              </div>
                            </>
                          )}
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
                              <span>Delete</span>
                            </button>
                            <button 
                              onClick={handleSaveEvent}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-100 transition-colors"
                            >
                              <span>Save</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => setSelectedEventForCalendar(event)}
                              className="flex items-center justify-center p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent"
                              title="View in Calendar"
                            >
                              <CalendarIcon className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => { setManageId(event.id); setEditEventData({ title: event.title, date: event.date, time: event.time }); }}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100 transition-colors"
                            >
                              <Settings className="h-4 w-4 text-indigo-500" />
                              <span>Edit Event</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-white">
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New {selectedCategory.name} Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CalendarModal 
        isOpen={!!selectedEventForCalendar || !!datePickerTarget} 
        onClose={() => {
          setSelectedEventForCalendar(null);
          setDatePickerTarget(null);
        }} 
        event={selectedEventForCalendar}
        allEvents={allEvents}
        onSelectDate={datePickerTarget ? (date) => {
          if (datePickerTarget === 'category') setEditDate(date);
          if (datePickerTarget === 'event') setEditEventData({ ...editEventData, date });
          setDatePickerTarget(null);
        } : undefined}
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleAdvancedCreate}
        defaultCategory={selectedCategory?.name}
      />
    </div>
  );
}
