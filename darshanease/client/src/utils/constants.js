export const APP_NAME = 'DarshanEase';

// Mock temple catalogue. Swap this for a real API response shape once the
// backend is wired up — templeService.js is the only place that needs to change.
export const TEMPLES = [
  {
    id: 'tirupati-tirumala',
    name: 'Sri Venkateswara Temple',
    city: 'Tirumala, Andhra Pradesh',
    deity: 'Lord Venkateswara',
    rating: 4.9,
    image: 'temple-1',
    description:
      'One of the most visited pilgrimage sites in the world, set on the seven hills of Tirumala.',
    darshanTypes: ['Special Entry (₹300)', 'Sarvadarshanam (Free)', 'Senior Citizen'],
  },
  {
    id: 'shirdi-saibaba',
    name: 'Shirdi Sai Baba Temple',
    city: 'Shirdi, Maharashtra',
    deity: 'Sai Baba',
    rating: 4.8,
    image: 'temple-2',
    description: 'The resting place of Sai Baba, drawing devotees from every faith.',
    darshanTypes: ['General Darshan', 'Paid Darshan (₹200)', 'Aarti Pass'],
  },
  {
    id: 'vaishno-devi',
    name: 'Vaishno Devi Temple',
    city: 'Katra, Jammu & Kashmir',
    deity: 'Mata Vaishno Devi',
    rating: 4.9,
    image: 'temple-3',
    description: 'A cave shrine reached by a scenic trek through the Trikuta hills.',
    darshanTypes: ['Yatra Slip (Free)', 'Helicopter Package', 'VIP Darshan'],
  },
  {
    id: 'meenakshi-madurai',
    name: 'Meenakshi Amman Temple',
    city: 'Madurai, Tamil Nadu',
    deity: 'Goddess Meenakshi',
    rating: 4.8,
    image: 'temple-4',
    description: 'A dazzling Dravidian temple famed for its painted gopurams.',
    darshanTypes: ['General Entry', 'Camera Ticket', 'Sannidhi Darshan (₹100)'],
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple (Harmandir Sahib)',
    city: 'Amritsar, Punjab',
    deity: 'Guru Granth Sahib',
    rating: 5.0,
    image: 'temple-5',
    description: 'The holiest Gurdwara of Sikhism, encircled by the sacred Amrit Sarovar.',
    darshanTypes: ['General Darshan (Free)', 'Langar Seva Slot'],
  },
  {
    id: 'jagannath-puri',
    name: 'Jagannath Temple',
    city: 'Puri, Odisha',
    deity: 'Lord Jagannath',
    rating: 4.7,
    image: 'temple-6',
    description: 'Home of the annual Rath Yatra and one of the Char Dham sites.',
    darshanTypes: ['General Darshan', 'Special Darshan (₹500)'],
  },
];

export const TIME_SLOTS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM',
];

export const TICKET_PRICE_MAP = {
  'Sarvadarshanam (Free)': 0,
  'General Darshan': 0,
  'General Darshan (Free)': 0,
  'General Entry': 0,
  'Yatra Slip (Free)': 0,
  'Special Entry (₹300)': 300,
  'Senior Citizen': 150,
  'Paid Darshan (₹200)': 200,
  'Aarti Pass': 250,
  'Helicopter Package': 2500,
  'VIP Darshan': 1000,
  'Camera Ticket': 50,
  'Sannidhi Darshan (₹100)': 100,
  'Langar Seva Slot': 0,
  'Special Darshan (₹500)': 500,
};

export const BOOKING_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
};

export const STORAGE_KEYS = {
  USERS: 'darshanease_users',
  SESSION: 'darshanease_session',
  BOOKINGS: 'darshanease_bookings',
};
