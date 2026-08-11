import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, Calendar, FileText, Award, Users, CheckCircle2, Bell, Cpu, GraduationCap, Trophy, Building2, ChevronDown, ChevronUp, Lock, MapPin, Info, Sparkles } from 'lucide-react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import Footer from '../../components/common/Footer';

// Text Roll Hover Animation Helper
const TextRoll = ({ text }: { text: string }) => (
  <span className="relative flex flex-col overflow-hidden h-[20px] leading-[20px]">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 flex flex-col">
      <span className="h-[20px] flex items-center">{text}</span>
      <span className="h-[20px] flex items-center">{text}</span>
    </span>
  </span>
);

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState<any>(null);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Official JNTU-GV Gallery Images for Auto-Rotating Carousel (5 Clean Official University Album Photos)
  const carouselImages = [
    {
      src: '/images/jntugv_convocation_ceremony.png',
      title: '1st Convocation Ceremony',
      subtitle: 'Jawaharlal Nehru Technological University Gurajada Vizianagaram',
      tag: 'Official University Event'
    },
    {
      src: '/images/jntugv_main_campus.png',
      title: 'JNTU-GV Vizianagaram Main Campus',
      subtitle: 'Central University Administrative & Engineering Campus',
      tag: 'Main Campus'
    },
    {
      src: '/images/jntugv_pharmacy_induction.png',
      title: 'College of Pharmaceutical Sciences Induction',
      subtitle: 'Welcome to B.Pharm Students at Academic Block-II',
      tag: 'Academic Orientation'
    },
    {
      src: '/images/jntugv_board_meeting.png',
      title: 'Academic Senate & Executive Council Meeting',
      subtitle: 'Administrative and Curriculum Senate Board Room',
      tag: 'University Governance'
    },
    {
      src: '/images/jntugv_cse_symposium.png',
      title: 'SIH Hackathon & CSE Code Sprint',
      subtitle: 'National level hackathon & technical symposium',
      tag: 'Technical Event'
    }
  ];

  // Auto-slide carousel every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Real JNTU-GV Vizianagaram Events & Gallery Items
  const jntugvEvents = [
    {
      id: 'convocation-1st',
      title: 'JNTU-GV 1st Convocation Ceremony',
      department: 'University Administration',
      date: 'July 11, 2026',
      time: '10:30 AM',
      location: 'AU Convention Centre, Visakhapatnam',
      type: 'Convocation',
      icon: GraduationCap,
      image: '/images/jntugv_convocation_ceremony.png',
      desc: 'Historic 1st Convocation Ceremony of JNTU-GV Vizianagaram. Degrees conferred by Vice-Chancellor and Executive Council members.',
      aboutDetails: 'Presided over by Hon ble Vice-Chancellor and Executive Council members. Gold Medals and degree certificates conferred to outstanding graduates across all engineering departments.',
      guidelines: [
        'Graduates must wear official ceremonial robes.',
        'Invitation passes mandatory for parents and guests.'
      ],
      status: 'Official Archive',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      id: 'pharmacy-induction',
      title: 'College of Pharmaceutical Sciences — B.Pharm Induction',
      department: 'College of Pharmaceutical Sciences',
      date: 'Nov 13, 2025',
      time: '10:00 AM',
      location: 'Gallery Hall, Academic Block-II, JNTU-GV',
      type: 'Induction',
      icon: Building2,
      image: '/images/jntugv_pharmacy_induction.png',
      desc: 'Orientation and inauguration program for First B.Pharm students admitted for the academic session at JNTU-GV.',
      aboutDetails: 'Welcoming first-year pharmacy students. Sessions include PCI regulations, laboratory safety, pharmaceutical research, and academic guidelines.',
      guidelines: [
        'Attendance mandatory for newly admitted students.',
        'Lab coat and orientation kit distributed.'
      ],
      status: 'Academic Event',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      id: 'senate-meeting',
      title: 'JNTU-GV Academic Senate & Executive Council Meeting',
      department: 'Executive Council',
      date: 'Aug 04, 2026',
      time: '11:00 AM',
      location: 'Senate Board Room, Administrative Block',
      type: 'Senate Board',
      icon: Users,
      image: '/images/jntugv_board_meeting.png',
      desc: 'Executive Senate meeting reviewing curriculum updates, research grants, and university administrative milestones.',
      aboutDetails: 'High-level committee meeting chaired by Vice-Chancellor reviewing NAAC accreditation roadmaps, academic syllabus updates, and faculty appointments.',
      guidelines: [
        'Restricted to Senate Members and Department Chairs.'
      ],
      status: 'Governance Notice',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-100',
    },
    {
      id: 'sih-2026',
      title: 'Smart India Hackathon (SIH 2026) — JNTU-GV Hackathon',
      department: 'Computer Science & Innovation Cell',
      date: 'Sep 18–19, 2026',
      time: '09:00 AM onwards',
      location: 'Central Library Auditorium & CSE Labs',
      type: 'National Hackathon',
      icon: Cpu,
      image: '/images/jntugv_cse_symposium.png',
      desc: 'National level software & hardware hackathon where students solve problem statements for government ministries and industry partners.',
      aboutDetails: '36-hour non-stop hackathon sprint focused on AI, IoT, Smart Education, and Agri-tech solutions.',
      guidelines: [
        'Teams of 6 members (minimum 1 female member mandatory).',
        'Top 10 teams nominated for SIH National Finals.'
      ],
      status: 'Registration Open',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      id: 'scci-vlsi',
      title: 'SCCI Semiconductor Design – Parikalpak Technical Program',
      department: 'ECE & R&D Cell',
      date: 'Sep 25, 2026',
      time: '10:00 AM – 04:30 PM',
      location: 'ECE Seminar Hall, JNTU-GV Campus',
      type: 'Semiconductor Workshop',
      icon: Cpu,
      image: '/images/jntugv_vlsi_workshop.png',
      desc: 'Specialized technical program on VLSI design, semiconductor chips, and hardware prototyping.',
      aboutDetails: 'Hands-on exposure to Verilog HDL, FPGA synthesis, and chip design tools guided by semiconductor industry experts.',
      guidelines: [
        'Open for 3rd & 4th year ECE, EEE, and CSE students.',
        'E-Certificates will be issued to all registered participants.'
      ],
      status: 'Upcoming',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
  ];

  return (
    <div className="bg-[#EFEFEF] min-h-screen text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      {/* ================================================== */}
      {/* SECTION 1: HERO & CAROUSEL                         */}
      {/* ================================================== */}
      <section className="relative flex flex-col bg-[#EFEFEF] pb-16">
        {/* Full-Screen Animated Shader Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader className="w-full h-full">
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor="#ff5f03"
              leftColor="#ff5f03"
              rightColor="#ff5f03"
              upColor="#ff5f03"
              momentum={13}
              radius={3.5}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* NAVIGATION BAR */}
        <header className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
          <nav className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-xs">
            {/* LEFT BRANDING & NAV LINKS WITH WIDER GAPS */}
            <div className="flex items-center">
              <Link to="/" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold tracking-tight shrink-0">
                JNTU
              </Link>
              <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[14px] font-normal text-gray-900 ml-8 lg:ml-12">
                {[
                  { name: 'Events', path: '#events' },
                  { name: 'Notifications', path: '#notifications' },
                  { name: 'Reports', path: '/reports' },
                  { name: 'Archive', path: '#archive' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="hover:text-gray-500 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 pr-1">
              <span className="text-[13px] text-gray-600 hidden lg:inline-block font-normal">
                Academic Session 2026–27 • Live Portal
              </span>
              <Link to="/student-login" className="bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-2.5 group cursor-pointer">
                <TextRoll text="Access Student Portal" />
                <span className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight size={13} />
                </span>
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-gray-900 text-white rounded-full p-2.5 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </header>

        {/* MOBILE MENU OVERLAY */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 transition-opacity duration-300"
            />
            {/* Bottom Sheet */}
            <div className="relative bg-white rounded-2xl mx-3 mb-3 p-6 shadow-2xl z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-0">
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500">JNTU-GV ERMS Portal</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-900 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-6 space-y-3">
                {[
                  { name: 'Events', path: '#events' },
                  { name: 'Notifications', path: '#notifications' },
                  { name: 'Reports', path: '/reports' },
                  { name: 'Archive', path: '#archive' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[28px] sm:text-[32px] font-medium text-gray-900 hover:text-gray-500 block py-1 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <Link
                to="/student-login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#F26522] text-white text-base font-medium rounded-full py-4 px-6 flex items-center justify-between shadow-md mt-4 cursor-pointer"
              >
                <span>Explore Events</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* HERO CONTENT AREA (CLEAN SEPARATION PREVENTING TEXT OVERLAP) */}
        <div className="relative z-20 flex-1 flex flex-col justify-start max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10">
          <div className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-2 font-semibold">
            JNTU-GV Vizianagaram • Event Report And Management System
          </div>

          <h1 className="text-[clamp(1.75rem,5vw,3.8rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 max-w-5xl">
            Centralized event management{' '}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            & report generation for JNTU-GV{' '}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Vizianagaram university.
          </h1>

          {/* CTA ROW */}
          <div className="mt-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/student-login" className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 group cursor-pointer transition-colors duration-300 shadow-xs">
              <TextRoll text="Explore Campus Events" />
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#F26522] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          {/* AUTO-ROTATING IMAGE CAROUSEL (ROTATES EVERY 2 SECONDS WITH REAL JNTU-GV GALLERY PHOTOS) */}
          <div className="w-full overflow-hidden relative rounded-3xl border border-gray-200/80 bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-md mt-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-[#F26522]" />
                <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                  Official JNTU-GV University Album Showcase
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Auto-Slide (Every 2s)
              </span>
            </div>

            {/* Main Featured Carousel Display */}
            <div className="relative h-52 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-900 group border border-gray-100 shadow-inner">
              {carouselImages.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === carouselIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-20">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#F26522] text-white px-2.5 py-1 rounded-md inline-block mb-2 shadow-xs">
                      {item.tag}
                    </span>
                    <h3 className="text-base sm:text-2xl font-bold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1 font-normal opacity-90">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}

              {/* Indicator Dots */}
              <div className="absolute top-4 right-4 z-30 flex space-x-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === carouselIndex ? 'w-6 bg-[#F26522]' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-3">
              {carouselImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-12 sm:h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    i === carouselIndex
                      ? 'border-[#F26522] scale-[1.02] shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 2: JNTU-GV LIVE EVENTS & NOTIFICATIONS     */}
      {/* ================================================== */}
      <section id="notifications" className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              1
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 inline-block">
              JNTU-GV Official Campus Events & Past Gallery
            </span>
          </div>

          {/* Heading h2 */}
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16 px-5 sm:px-8 lg:px-12 max-w-5xl">
            University convocations, academic council meetings,{' '}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            induction ceremonies, and technical workshops.
          </h2>

          {/* Real Events Grid */}
          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jntugvEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEventModal(evt)}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 hover:border-gray-900 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md cursor-pointer overflow-hidden"
              >
                <div className="h-44 w-full relative overflow-hidden bg-gray-100">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-gray-900/90 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {evt.type}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        {evt.date}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${evt.badgeColor}`}>
                        {evt.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1.5 line-clamp-2">
                      {evt.title}
                    </h3>

                    <p className="text-xs font-semibold text-indigo-600 mb-2">
                      {evt.department}
                    </p>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {evt.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-700">
                      JNTU-GV Vizianagaram
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventModal(evt);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 3: CASE STUDIES / FEATURED EVENTS          */}
      {/* ================================================== */}
      <section id="events" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 inline-block">
              University Official Album Archive
            </span>
          </div>

          {/* Heading h2 */}
          <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16">
            Featured Campus Ceremonies
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
            {/* CARD 1 (1st Convocation) */}
            <div
              onClick={() => setSelectedEventModal(jntugvEvents[0])}
              className="group cursor-pointer block"
            >
              <div className="aspect-[329/246] rounded-2xl overflow-hidden bg-gray-100 relative w-full border border-gray-200/80">
                <img
                  src="/images/jntugv_convocation_ceremony.png"
                  alt="JNTU-GV 1st Convocation Ceremony"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-white text-gray-900 h-9 w-9 group-hover:w-[148px] rounded-full transition-all duration-300 ease-in-out flex items-center justify-between px-2.5 overflow-hidden shadow-md">
                    <span className="text-[13px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                      View Details
                    </span>
                    <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out shrink-0 ml-auto" />
                  </div>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed font-normal">
                Historic 1st Convocation Ceremony presided over by Hon ble Vice-Chancellor and Executive Council members.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                JNTU-GV 1st Convocation Ceremony 2026
              </h3>
            </div>

            {/* CARD 2 (B.Pharm Induction) */}
            <div
              onClick={() => setSelectedEventModal(jntugvEvents[1])}
              className="group cursor-pointer block"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative w-full border border-gray-200/80">
                <img
                  src="/images/jntugv_pharmacy_induction.png"
                  alt="College of Pharmaceutical Sciences Induction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-gray-900 text-white h-9 w-9 group-hover:w-[168px] rounded-full transition-all duration-300 ease-in-out flex items-center justify-between px-2.5 overflow-hidden shadow-md">
                    <span className="text-[13px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-1">
                      Explore Details
                    </span>
                    <ArrowRight
                      size={14}
                      className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out shrink-0 ml-auto"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed font-normal">
                Induction and academic orientation for First B.Pharm Students at Gallery Hall, Academic Block-II.
              </p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                B.Pharm Students Induction Ceremony
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* INTERACTIVE EVENT DETAILS MODAL (NO LOGIN REQUIRED) */}
      {/* ================================================== */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedEventModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border ${selectedEventModal.badgeColor}`}>
                  {selectedEventModal.type}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedEventModal.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Event Title & Subtitle */}
            <div className="my-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {selectedEventModal.title}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 mt-1">
                {selectedEventModal.department} • JNTU-GV Vizianagaram
              </p>
            </div>

            {/* Event Image Banner */}
            <div className="my-4 h-48 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Schedule Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
              <div className="flex items-center space-x-2 text-gray-700">
                <Calendar size={15} className="text-indigo-600 shrink-0" />
                <span><strong>Date:</strong> {selectedEventModal.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin size={15} className="text-indigo-600 shrink-0" />
                <span><strong>Venue:</strong> {selectedEventModal.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed my-3 font-normal">
              {selectedEventModal.desc}
            </p>

            {/* EXPANDABLE DROPDOWN ACCORDION: ABOUT EVENT & GUIDELINES */}
            <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden bg-[#F8FAFC]">
              <button
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-bold text-gray-900 hover:bg-gray-100/80 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Info size={15} className="text-indigo-600" />
                  <span>About Event & Registration Guidelines</span>
                </div>
                {isAboutDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isAboutDropdownOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-200/60 space-y-3 text-xs text-gray-600">
                  <p className="leading-relaxed font-normal">
                    {selectedEventModal.aboutDetails}
                  </p>
                  
                  {selectedEventModal.guidelines && (
                    <div className="pt-2">
                      <div className="font-bold text-gray-900 mb-1.5 uppercase tracking-wider text-[10px]">
                        Event Rules & Guidelines:
                      </div>
                      <ul className="list-disc pl-4 space-y-1 font-medium text-gray-700">
                        {selectedEventModal.guidelines.map((g: string, idx: number) => (
                          <li key={idx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MODAL ACTION BUTTONS */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Close Preview
              </button>

              <Link
                to={`/student-login?eventId=${selectedEventModal.id}`}
                className="w-full sm:w-auto bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2 group transition-colors shadow-md cursor-pointer"
              >
                <Lock size={13} />
                <span>Login to Register as Student</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
