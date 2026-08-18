import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@muj.manipal.edu',
    role: 'STUDENT',
    studentId: '2233010001',
    academic: { department: 'Computer Science & Engineering', year: 3 },
    interests: ['AI/ML', 'Web Development', 'Hackathons', 'Robotics'],
    skills: ['React', 'TypeScript', 'Python', 'TensorFlow', 'Node.js'],
    profile: {
      profilePicture: 'https://i.pravatar.cc/150?img=12',
      bio: 'CS junior building things and breaking them. ML enthusiast and hackathon regular.',
      phone: '+91 98765 43210',
    },
  },
  {
    id: 'u2',
    name: 'Priya Nair',
    email: 'priya.nair@muj.manipal.edu',
    role: 'CLUB_ADMIN',
    studentId: '2233010155',
    academic: { department: 'Information Technology', year: 4 },
    interests: ['AI/ML', 'Community Building', 'Workshops'],
    skills: ['Python', 'PyTorch', 'Public Speaking'],
    profile: {
      profilePicture: 'https://i.pravatar.cc/150?img=47',
      bio: 'President @ AIML Community. Organizing AIrena 2026.',
      phone: '+91 99887 76655',
    },
  },
  {
    id: 'u3',
    name: 'Dr. Rohan Verma',
    email: 'rohan.verma@manipal.edu',
    role: 'CAMPUS_ADMIN',
    profile: {
      profilePicture: 'https://i.pravatar.cc/150?img=68',
      bio: 'Faculty coordinator for student activities and clubs.',
    },
  },
];
