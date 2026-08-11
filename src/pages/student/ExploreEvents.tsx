import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSharedEvents } from '../../data/mockEvents';

export default function ExploreEvents() {
  const [activeCategory, setActiveCategory] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');

  const [dummyEvents] = useState(getSharedEvents());

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 font-sans text-gray-900">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Explore Campus Events</h1>
          <p className="text-xs text-gray-600 mt-1 font-normal">Discover and register for upcoming JNTU-GV Vizianagaram workshops, symposiums, and cultural events.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by event, dept..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white w-full sm:w-64 lg:w-72 transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap sm:flex-initial shadow-2xs cursor-pointer">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {['All Events', 'Conference', 'Workshop', 'Seminar', 'Competition', 'Cultural', 'Sports'].map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeCategory === cat 
                ? 'bg-gray-900 text-white shadow-2xs' 
                : 'bg-white border border-gray-200/80 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {cat === 'Workshop' ? 'Workshops' : 
             cat === 'Seminar' ? 'Seminars' : 
             cat === 'Competition' ? 'Competitions' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.filter((event: any) => {
          const matchesCategory = activeCategory === 'All Events' || event.category === activeCategory;
          const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                event.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (event.tags && event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
          return matchesCategory && matchesSearch;
        }).map((event: any) => (
          <Link to={`/student/explore/${event.id}`} key={event.id} className="bg-white rounded-2xl shadow-2xs border border-gray-200/80 overflow-hidden hover:border-gray-900 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
            <div className="h-44 w-full relative overflow-hidden bg-gray-100 border-b border-gray-100">
              <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-gray-900/90 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {event.category}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {event.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">{event.title}</h3>
              <p className="text-xs font-semibold text-indigo-600 mb-4">{event.department}</p>
              
              <div className="space-y-1.5 mt-auto pt-3 border-t border-gray-100 text-xs font-medium text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                  {event.date} • {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
                  {event.location}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs font-semibold text-gray-700">
                  <span className="font-extrabold text-gray-900">{event.registered}</span>
                  <span className="text-gray-500 font-normal"> / {event.seats} registered</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/student/explore/${event.id}?register=true`;
                  }} 
                  className="flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>Register</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
