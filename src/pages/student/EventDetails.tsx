import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Tag, Info, ListChecks, CheckCircle2, Heart, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// Using the same dummy data structure from ExploreEvents for demonstration
const dummyEvents = [
  {
    id: 1,
    title: 'Global Tech Symposium 2026',
    date: 'Aug 24, 2026',
    time: '09:00 AM',
    location: 'Main Auditorium',
    category: 'Conference',
    department: 'Computer Science',
    seats: '500',
    registered: 342,
    image: '/images/conference.png',
    tags: ['AI', 'Tech', 'Networking'],
    description: 'Join us for the biggest technology event of the year on campus. The Global Tech Symposium brings together industry leaders, alumni, and bright student minds to discuss the future of AI, quantum computing, and global tech entrepreneurship. Expect keynote speeches, panel discussions, and ample networking opportunities.',
    agenda: [
      { time: '09:00 AM', activity: 'Registration & Welcome Kit Distribution' },
      { time: '10:00 AM', activity: 'Keynote Speech: The Future of AI' },
      { time: '12:00 PM', activity: 'Networking Lunch' },
      { time: '01:30 PM', activity: 'Panel Discussion: Tech Startups' },
      { time: '04:00 PM', activity: 'Closing Ceremony' }
    ],
    rules: [
      'University ID card is mandatory for entry',
      'Formal or smart casual attire required',
      'Laptops are allowed (power outlets limited)'
    ]
  },
  {
    id: 2,
    title: 'Annual Hackathon: CodeRed',
    date: 'Sep 02, 2026',
    time: '08:00 AM',
    location: 'CSE Block, Labs 1-5',
    category: 'Competition',
    department: 'IT & CSE',
    seats: '200',
    registered: 185,
    image: '/images/hackathon.png',
    tags: ['Coding', 'Prizes'],
    description: 'A 24-hour coding marathon where developers, designers, and ideators come together to build innovative solutions to real-world problems. Great prizes to be won, along with swags and free food!',
    agenda: [
      { time: '08:00 AM', activity: 'Team Formation & Ideation' },
      { time: '10:00 AM', activity: 'Hacking Begins' },
      { time: '08:00 PM', activity: 'Midnight Pizza & Mentor Check-in' },
      { time: '08:00 AM (Next Day)', activity: 'Project Submission' },
      { time: '11:00 AM (Next Day)', activity: 'Presentations & Judging' }
    ],
    rules: [
      'Teams must consist of 2-4 members',
      'All code must be written during the hackathon',
      'Use of open-source libraries is permitted'
    ]
  },
  {
    id: 3,
    title: 'Business Pitch 101',
    date: 'Sep 10, 2026',
    time: '11:00 AM',
    location: 'Seminar Hall B',
    category: 'Workshop',
    department: 'Management',
    seats: '100',
    registered: 45,
    image: '/images/workshop.png',
    tags: ['Startup', 'Business'],
    description: 'Learn the art of pitching your startup idea to investors. This interactive workshop covers slide deck creation, financial forecasting basics, and the psychology of a successful pitch.',
    agenda: [
      { time: '11:00 AM', activity: 'Introduction to Pitch Decks' },
      { time: '12:30 PM', activity: 'Interactive Session: Crafting your story' },
      { time: '02:00 PM', activity: 'Mock Pitches with Feedback' }
    ],
    rules: [
      'Come prepared with a rough startup idea',
      'Active participation is expected'
    ]
  },
  {
    id: 4,
    title: 'Cultural Fest: Rhythm & Beats',
    date: 'Sep 15, 2026',
    time: '05:00 PM',
    location: 'Open Air Theatre',
    category: 'Cultural',
    department: 'Student Council',
    seats: '2000',
    registered: 1240,
    image: '/images/cultural.png',
    tags: ['Music', 'Dance', 'Fun'],
    description: 'The most awaited cultural night of the semester! Enjoy performances from the university dance crew, music band, and special guest artists. Food stalls will be available.',
    agenda: [
      { time: '05:00 PM', activity: 'Entry & Food Stalls Open' },
      { time: '06:30 PM', activity: 'Student Performances Begin' },
      { time: '08:30 PM', activity: 'Guest DJ Set' },
      { time: '10:00 PM', activity: 'Curfew' }
    ],
    rules: [
      'No outside food or beverages allowed',
      'Student ID is required',
      'No re-entry after 8 PM'
    ]
  },
  {
    id: 5,
    title: 'Cloud Computing Architecture',
    date: 'Sep 22, 2026',
    time: '10:00 AM',
    location: 'Virtual / Online',
    category: 'Seminar',
    department: 'IT',
    seats: '300',
    registered: 290,
    image: '/images/seminar.png',
    tags: ['AWS', 'Cloud'],
    description: 'Deep dive into modern cloud architecture focusing on AWS serverless technologies. Taught by industry experts from leading tech firms.',
    agenda: [
      { time: '10:00 AM', activity: 'Evolution of Cloud Computing' },
      { time: '11:00 AM', activity: 'Serverless Architecture Deep Dive' },
      { time: '12:30 PM', activity: 'Live Q&A' }
    ],
    rules: [
      'Webinar link will be shared 24 hours prior',
      'Please keep microphones muted during presentation'
    ]
  },
  {
    id: 6,
    title: 'Sports Meet: Inter-Departmental',
    date: 'Oct 01, 2026',
    time: '08:00 AM',
    location: 'University Sports Ground',
    category: 'Sports',
    department: 'Physical Education',
    seats: '500',
    registered: 120,
    image: '/images/sports.png',
    tags: ['Athletics', 'Team Sports'],
    description: 'Annual inter-departmental sports meet featuring track and field, football, basketball, and volleyball tournaments. Support your department!',
    agenda: [
      { time: '08:00 AM', activity: 'Opening Ceremony & March Past' },
      { time: '09:00 AM', activity: 'Track Events (Heats)' },
      { time: '11:00 AM', activity: 'Team Sports Preliminaries' },
      { time: '04:00 PM', activity: 'Finals & Medal Ceremony' }
    ],
    rules: [
      'Participants must wear department jerseys',
      'Proper sports shoes are mandatory',
      'Umpire decisions are final'
    ]
  }
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    rollNumber: '',
    year: '1st Year',
    city: ''
  });

  useEffect(() => {
    // Check if already registered in local storage
    const savedRegs = JSON.parse(localStorage.getItem('my_registrations') || '[]');
    if (savedRegs.find((r: any) => r.id === Number(id))) {
      setIsRegistered(true);
    }

    // Check if already saved in local storage
    const savedEvents = JSON.parse(localStorage.getItem('my_saved_events') || '[]');
    if (savedEvents.find((e: any) => e.id === Number(id))) {
      setIsSaved(true);
    }

    // Check if the URL has a ?register=true query parameter
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('register') === 'true' && !isRegistered) {
      setShowRegistrationModal(true);
    }
  }, [location, id]);

  // Find the event by ID (convert id to number since params are strings)
  const event = dummyEvents.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Event not found</h2>
        <button onClick={() => navigate('/student/explore')} className="btn-primary">
          Back to Events
        </button>
      </div>
    );
  }

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRegistrationModal(false);
    setIsRegistered(true);

    // Save to local storage to persist the registration
    if (event) {
      const savedRegs = JSON.parse(localStorage.getItem('my_registrations') || '[]');
      if (!savedRegs.find((r: any) => r.id === event.id)) {
        savedRegs.push({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          status: 'Confirmed',
          image: event.image
        });
        localStorage.setItem('my_registrations', JSON.stringify(savedRegs));
      }
    }
  };

  const handleSaveToggle = () => {
    if (!event) return;
    
    const savedEvents = JSON.parse(localStorage.getItem('my_saved_events') || '[]');
    if (isSaved) {
      const updated = savedEvents.filter((e: any) => e.id !== event.id);
      localStorage.setItem('my_saved_events', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedEvents.push({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        image: event.image
      });
      localStorage.setItem('my_saved_events', JSON.stringify(savedEvents));
      setIsSaved(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/student/explore')}
        className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-64 sm:h-80 md:h-96 w-full relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 rounded-full shadow-sm">
                  {event.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 leading-tight">
                  {event.title}
                </h1>
                <p className="text-indigo-100 font-medium text-lg">
                  Organized by: {event.department}
                </p>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="flex flex-wrap items-center justify-between p-6 bg-white border-b border-slate-100 gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center text-slate-700">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">About This Event</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {event.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {event.tags.map((tag, i) => (
                <span key={i} className="flex items-center text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md">
                  <Tag className="h-3 w-3 mr-1.5" /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Agenda Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <ListChecks className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Event Schedule</h2>
            </div>
            <div className="space-y-6">
              {event.agenda.map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Timeline Line */}
                  {i !== event.agenda.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-200"></div>
                  )}
                  <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex-shrink-0 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-indigo-600 block mb-0.5">{item.time}</span>
                    <span className="text-slate-700 font-medium">{item.activity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Registration Card (Sticky) */}
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-indigo-700">
                <Users className="h-5 w-5" />
                <span className="font-bold">{event.registered} / {event.seats}</span>
              </div>
              <span className="text-xs font-semibold uppercase text-slate-500">Seats Taken</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${(event.registered / parseInt(event.seats)) * 100}%` }}
              ></div>
            </div>

            <button 
              onClick={handleRegisterClick}
              disabled={isRegistered}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all shadow-sm flex justify-center items-center gap-2 ${
                isRegistered 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
              }`}
            >
              {isRegistered ? (
                <><CheckCircle2 className="h-5 w-5" /> Registration Confirmed</>
              ) : 'Register Now'}
            </button>
            
            <button 
              onClick={handleSaveToggle}
              className={`w-full mt-3 py-2.5 rounded-xl font-medium text-sm transition-colors flex justify-center items-center gap-2 border ${
                isSaved
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} /> 
              {isSaved ? 'Saved to Favorites' : 'Save for Later'}
            </button>
          </div>

          {/* Rules Section */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Rules & Guidelines</h3>
            <ul className="space-y-3">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5"></div>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          
        </div>

      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Register for Event</h3>
              <button onClick={() => setShowRegistrationModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">College Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. Engineering Institute"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label>
                <input 
                  type="text" 
                  required
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. CS2026-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input 
                  type="text" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year of Study</label>
                <select
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
