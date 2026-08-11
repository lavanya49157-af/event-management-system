import { useState } from 'react';
import { Upload, Filter, Search, Image as ImageIcon, Video, Folder, Trash2, MoreVertical } from 'lucide-react';
import { getSharedEvents } from '../../data/mockEvents';

export default function AdminMedia() {
  const [events] = useState(getSharedEvents());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedia = events.filter((e: any) => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Management</h1>
          <p className="text-slate-600 mt-1">Manage event banners, gallery images, and promotional videos.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors">
          <Upload className="h-4 w-4 mr-2" /> Upload Media
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><ImageIcon className="h-6 w-6" /></div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Images</div>
            <div className="text-xl font-bold text-slate-900">1,248</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center"><Video className="h-6 w-6" /></div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Videos</div>
            <div className="text-xl font-bold text-slate-900">42</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Folder className="h-6 w-6" /></div>
          <div>
            <div className="text-sm font-medium text-slate-500">Albums</div>
            <div className="text-xl font-bold text-slate-900">18</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><Upload className="h-6 w-6" /></div>
          <div>
            <div className="text-sm font-medium text-slate-500">Storage Used</div>
            <div className="text-xl font-bold text-slate-900">45.2 GB</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search media by event title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            <ImageIcon className="h-4 w-4" /> Images
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((event: any) => (
          <div key={event.id} className="group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-video cursor-pointer">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-sm truncate">{event.title}</h3>
                <p className="text-slate-300 text-xs mt-1">2.4 MB • Image</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded text-white transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded text-white transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
