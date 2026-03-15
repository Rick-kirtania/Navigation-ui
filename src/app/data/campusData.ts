export interface Room {
  id: string;
  number: string;
  type: 'classroom' | 'lab' | 'office' | 'common';
  department?: string;
  assignedTo?: string;
  capacity?: number;
}

export interface Building {
  id: string;
  name: string;
  shortName: string;
  description: string;
  departments: string[];
  rooms: Room[];
  position: { x: number; y: number };
  icon: string;
  color: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  phone: string;
  location: string;
  icon: string;
}

export interface EventLocation {
  id: string;
  name: string;
  type: 'hall' | 'stall' | 'washroom' | 'food';
  position: { x: number; y: number };
  description: string;
}

export const buildings: Building[] = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    shortName: 'Main Gate',
    description: 'Primary entrance to SVU Campus',
    departments: ['Security'],
    rooms: [
      { id: 'mg-1', number: 'Security Room', type: 'office', assignedTo: 'Security Chief - Mr. Rajesh Kumar' }
    ],
    position: { x: 15, y: 50 },
    icon: '🚪',
    color: '#10B981'
  },
  {
    id: 'admin-block',
    name: 'Administrative Block',
    shortName: 'Admin Block',
    description: 'Main administrative offices and academic services',
    departments: ['Administration', 'Accounts', 'Admissions'],
    rooms: [
      { id: 'ab-101', number: '101', type: 'office', assignedTo: 'Dean - Dr. Amit Sharma' },
      { id: 'ab-102', number: '102', type: 'office', assignedTo: 'Registrar - Prof. Sunita Devi' },
      { id: 'ab-103', number: '103', type: 'office', assignedTo: 'Accounts Head - Mr. Prakash Gupta' },
      { id: 'ab-104', number: '104', type: 'office', assignedTo: 'Admissions Officer - Ms. Priya Singh' },
      { id: 'ab-105', number: '105', type: 'common', assignedTo: 'Reception Area' }
    ],
    position: { x: 30, y: 45 },
    icon: '🏛️',
    color: '#3B82F6'
  },
  {
    id: 'cse-block',
    name: 'Computer Science & Engineering Block',
    shortName: 'CSE Block',
    description: 'CSE department with state-of-the-art labs and classrooms',
    departments: ['Computer Science', 'Information Technology'],
    rooms: [
      { id: 'cse-201', number: '201', type: 'classroom', department: 'CSE', capacity: 60, assignedTo: 'Data Structures - Dr. Ravi Verma' },
      { id: 'cse-202', number: '202', type: 'classroom', department: 'CSE', capacity: 60, assignedTo: 'Algorithms - Prof. Meena Chatterjee' },
      { id: 'cse-203', number: '203', type: 'lab', department: 'CSE', capacity: 40, assignedTo: 'Programming Lab - Mr. Sanjay Roy' },
      { id: 'cse-204', number: '204', type: 'lab', department: 'CSE', capacity: 40, assignedTo: 'Database Lab - Ms. Anjali Banerjee' },
      { id: 'cse-205', number: '205', type: 'lab', department: 'CSE', capacity: 40, assignedTo: 'Web Dev Lab - Mr. Deepak Mishra' },
      { id: 'cse-301', number: '301', type: 'office', department: 'CSE', assignedTo: 'HOD CSE - Dr. Subhash Chandra' },
      { id: 'cse-302', number: '302', type: 'office', department: 'CSE', assignedTo: 'Faculty Room - Multiple Staff' },
      { id: 'cse-303', number: '303', type: 'classroom', department: 'IT', capacity: 50, assignedTo: 'Network Security - Dr. Kavita Sen' }
    ],
    position: { x: 55, y: 35 },
    icon: '💻',
    color: '#8B5CF6'
  },
  {
    id: 'library',
    name: 'Central Library',
    shortName: 'Library',
    description: 'Multi-story library with extensive collection of books and digital resources',
    departments: ['Library Services', 'Digital Resources'],
    rooms: [
      { id: 'lib-g1', number: 'Ground Floor - Reading Hall', type: 'common', capacity: 200 },
      { id: 'lib-g2', number: 'Ground Floor - Reference Section', type: 'common' },
      { id: 'lib-f1', number: '1st Floor - Engineering Books', type: 'common' },
      { id: 'lib-f2', number: '2nd Floor - Digital Library', type: 'lab', capacity: 50 },
      { id: 'lib-off', number: 'Librarian Office', type: 'office', assignedTo: 'Chief Librarian - Dr. Mohan Das' }
    ],
    position: { x: 45, y: 60 },
    icon: '📚',
    color: '#F59E0B'
  },
  {
    id: 'canteen',
    name: 'Student Canteen',
    shortName: 'Canteen',
    description: 'Multi-cuisine dining facility for students and staff',
    departments: ['Food Services'],
    rooms: [
      { id: 'can-1', number: 'Main Dining Hall', type: 'common', capacity: 300 },
      { id: 'can-2', number: 'Kitchen', type: 'common' },
      { id: 'can-3', number: 'Manager Office', type: 'office', assignedTo: 'Canteen Manager - Mr. Suresh Yadav' }
    ],
    position: { x: 70, y: 55 },
    icon: '🍽️',
    color: '#EC4899'
  },
  {
    id: 'hostel',
    name: 'Student Hostel',
    shortName: 'Hostel',
    description: 'Residential facility for outstation students',
    departments: ['Hostel Administration'],
    rooms: [
      { id: 'hos-1', number: 'Warden Office', type: 'office', assignedTo: 'Chief Warden - Dr. Ashok Mukherjee' },
      { id: 'hos-2', number: 'Common Room', type: 'common', capacity: 50 },
      { id: 'hos-3', number: 'Mess Hall', type: 'common', capacity: 200 },
      { id: 'hos-4', number: 'Boys Wing (100 rooms)', type: 'common' },
      { id: 'hos-5', number: 'Girls Wing (80 rooms)', type: 'common' }
    ],
    position: { x: 80, y: 30 },
    icon: '🏠',
    color: '#06B6D4'
  },
  {
    id: 'medical',
    name: 'Medical Center',
    shortName: 'Medical',
    description: 'On-campus medical facility with 24/7 emergency services',
    departments: ['Health Services'],
    rooms: [
      { id: 'med-1', number: 'Emergency Ward', type: 'common' },
      { id: 'med-2', number: 'Consultation Room', type: 'office', assignedTo: 'Dr. Nisha Sharma - MBBS' },
      { id: 'med-3', number: 'Pharmacy', type: 'common' },
      { id: 'med-4', number: 'Nurse Station', type: 'office', assignedTo: 'Nurse - Ms. Rina Das' }
    ],
    position: { x: 25, y: 70 },
    icon: '🏥',
    color: '#EF4444'
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'medical',
    title: 'Medical Emergency',
    phone: '+91-9876543210',
    location: 'Medical Center, Ground Floor',
    icon: '🚑'
  },
  {
    id: 'security',
    title: 'Security Office',
    phone: '+91-9876543211',
    location: 'Main Gate Security Office',
    icon: '👮'
  },
  {
    id: 'fire',
    title: 'Fire Safety',
    phone: '+91-9876543212',
    location: 'Admin Block, Basement',
    icon: '🚒'
  },
  {
    id: 'ambulance',
    title: 'Ambulance Service',
    phone: '+91-9876543213',
    location: 'Medical Center',
    icon: '🏥'
  }
];

export const eventLocations: EventLocation[] = [
  {
    id: 'event-hall-1',
    name: 'Main Auditorium',
    type: 'hall',
    position: { x: 35, y: 55 },
    description: 'Capacity: 500 people, AC, Stage with sound system'
  },
  {
    id: 'event-hall-2',
    name: 'Seminar Hall',
    type: 'hall',
    position: { x: 40, y: 50 },
    description: 'Capacity: 200 people, Projector, AC'
  },
  {
    id: 'stall-zone-1',
    name: 'Tech Stalls Zone A',
    type: 'stall',
    position: { x: 50, y: 50 },
    description: '15 stalls for technical exhibitions'
  },
  {
    id: 'stall-zone-2',
    name: 'Cultural Stalls Zone B',
    type: 'stall',
    position: { x: 60, y: 45 },
    description: '10 stalls for cultural activities'
  },
  {
    id: 'food-zone-1',
    name: 'Food Court - North',
    type: 'food',
    position: { x: 65, y: 60 },
    description: 'Multiple food vendors and seating'
  },
  {
    id: 'food-zone-2',
    name: 'Snacks Counter',
    type: 'food',
    position: { x: 75, y: 50 },
    description: 'Quick bites and beverages'
  },
  {
    id: 'washroom-1',
    name: 'Washroom Block - Central',
    type: 'washroom',
    position: { x: 48, y: 45 },
    description: 'Male & Female facilities'
  },
  {
    id: 'washroom-2',
    name: 'Washroom Block - East',
    type: 'washroom',
    position: { x: 75, y: 40 },
    description: 'Male & Female facilities'
  }
];

export const universityInfo = {
  name: 'Swami Vivekananda University',
  location: 'Barrackpore, West Bengal',
  email: 'info@svu.ac.in',
  phone: '+91-033-2592-xxxx',
  established: '2017',
  motto: 'Excellence in Education',
  website: 'www.svu.ac.in'
};
