export const initialEvents = [
  {
    id: 6,
    title: 'JNTU-GV 80th Independence Day Grand Celebration & Flag Hoisting',
    date: 'August 15, 2026',
    time: '08:00 AM',
    location: 'JNTU-GV Main Campus Grounds & Administrative Block',
    category: 'National Celebration',
    department: 'University Administration & NSS / NCC Units',
    departmentCode: 'ADMIN',
    seats: '5000+',
    registered: 3840,
    image: '/images/independence_day_celebration.png',
    tags: ['80th Independence Day', '15th August', 'Har Ghar Tiranga', 'Flag Hoisting', 'Patriotic Fest'],
    aboutDetails: 'Join JNTU-GV Vizianagaram in celebrating the grand 80th Independence Day on August 15th! The national flag will be hoisted by the Hon\'ble Vice-Chancellor followed by patriotic addresses, NCC parade, NSS sapling plantation drive, cultural performances by students, and national unity celebrations across the campus.',
    guidelines: [
      'Flag Hoisting Ceremony begins at 08:00 AM sharp at the Main Administrative Grounds.',
      'Traditional or formal attire is recommended for all attending students, faculty, and staff.',
      'Cultural events, march past, and NSS tree plantation will follow the official address.',
      'Sweet distribution and certificate distributions for active student volunteers.'
    ]
  },
  {
    id: 1,
    title: 'JNTU-GV 1st Convocation Ceremony',
    date: 'July 11, 2026',
    time: '10:30 AM',
    location: 'AU Convention Centre, Visakhapatnam',
    category: 'Convocation',
    department: 'University Administration',
    departmentCode: 'ADMIN',
    seats: '1500',
    registered: 1420,
    image: '/images/jntugv_convocation_ceremony.png',
    tags: ['Convocation', 'Degree Awards', 'Gold Medals'],
    aboutDetails: 'Historic 1st Convocation Ceremony of Jawaharlal Nehru Technological University Gurajada Vizianagaram. Degrees conferred by Honble Vice-Chancellor and Executive Council members.',
    guidelines: [
      'Graduates must wear prescribed academic robes.',
      'Entry passes required for parents and guests.'
    ]
  },
  {
    id: 2,
    title: 'College of Pharmaceutical Sciences — B.Pharm Induction Program',
    date: 'Nov 13, 2025',
    time: '10:00 AM',
    location: 'Gallery Hall, Academic Block-II, JNTU-GV',
    category: 'Induction',
    department: 'College of Pharmaceutical Sciences',
    departmentCode: 'PHARM',
    seats: '120',
    registered: 110,
    image: '/images/jntugv_pharmacy_induction.png',
    tags: ['Pharmacy', 'Orientation', 'Academics'],
    aboutDetails: 'Orientation and welcome ceremony for First B.Pharm students admitted for the academic session at JNTU-GV College of Pharmaceutical Sciences.',
    guidelines: [
      'Attendance mandatory for first-year B.Pharm students.',
      'Introduction to curriculum, laboratory safety, and PCI regulations.'
    ]
  },
  {
    id: 3,
    title: 'JNTU-GV Academic Council & Senate Board Meeting',
    date: 'Aug 04, 2026',
    time: '11:00 AM',
    location: 'Senate Board Room, Administrative Block',
    category: 'Meeting',
    department: 'University Executive Senate',
    departmentCode: 'ADMIN',
    seats: '50',
    registered: 42,
    image: '/images/jntugv_board_meeting.png',
    tags: ['Governance', 'Senate', 'Academic Policies'],
    aboutDetails: 'Executive Council and Academic Senate review meeting on academic syllabus revision, faculty recruitment, and campus infrastructure development.',
    guidelines: [
      'Restricted to Senate members and Department Heads.'
    ]
  },
  {
    id: 4,
    title: 'Smart India Hackathon (SIH 2026) — JNTU-GV Internal Hackathon',
    date: 'Sep 18, 2026',
    time: '09:00 AM',
    location: 'Central Library & CSE Computer Labs',
    category: 'Hackathon',
    department: 'Computer Science & Innovation Cell',
    departmentCode: 'CSE',
    seats: '300',
    registered: 285,
    image: '/images/jntugv_cse_symposium.png',
    tags: ['SIH 2026', 'AI Code Sprint', 'Hardware'],
    aboutDetails: '36-hour hackathon for SIH problem statements. Top teams selected for National SIH finals.',
    guidelines: [
      'Teams of 6 with mandatory female member.',
      'Prototype demonstration required.'
    ]
  },
  {
    id: 5,
    title: 'SCCI Semiconductor Design – Parikalpak Technical Program',
    date: 'Sep 25, 2026',
    time: '10:00 AM',
    location: 'ECE Seminar Hall, JNTU-GV Campus',
    category: 'Workshop',
    department: 'ECE & R&D Cell',
    departmentCode: 'ECE',
    seats: '250',
    registered: 210,
    image: '/images/jntugv_vlsi_workshop.png',
    tags: ['VLSI', 'Semiconductors', 'Chip Design'],
    aboutDetails: 'Technical sessions on Verilog HDL, FPGA synthesis, and chip design tools guided by semiconductor industry experts.',
    guidelines: [
      'Targeted for 3rd and 4th year ECE/EEE students.'
    ]
  }
];

export const getSharedEvents = () => {
  const stored = localStorage.getItem('shared_events');
  if (stored) {
    let parsed = JSON.parse(stored);
    const hasEv6 = parsed.some((ev: any) => ev.id === 6);
    if (!hasEv6) {
      parsed = [initialEvents[0], ...parsed];
    } else {
      parsed = parsed.map((ev: any) => (ev.id === 6 ? initialEvents[0] : ev));
    }
    localStorage.setItem('shared_events', JSON.stringify(parsed));
    return parsed;
  }
  localStorage.setItem('shared_events', JSON.stringify(initialEvents));
  return initialEvents;
};

export const saveSharedEvents = (events: any[]) => {
  localStorage.setItem('shared_events', JSON.stringify(events));
};
