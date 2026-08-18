import type { Club } from '@/types';

export const mockClubs: Club[] = [
  {
    id: 'c1',
    name: 'AIML Community',
    description:
      'A community of students passionate about artificial intelligence and machine learning. We host workshops, paper-reading sessions, and the flagship AIrena hackathon every year.',
    category: 'Technical',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=aiml&backgroundColor=389aff',
    createdBy: 'u2',
    admins: ['u2'],
    contactEmail: 'aiml@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/aiml_muj',
      linkedin: 'https://linkedin.com/company/aiml-muj',
      website: 'https://aiml.mujclubs.in',
    },
    status: 'ACTIVE',
    createdAt: '2023-08-12T09:00:00Z',
    updatedAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'c2',
    name: 'ACM Student Chapter',
    description:
      'The official ACM Student Chapter at MUJ. We run Tech Tuesday workshops, competitive programming contests, and connect students with the global ACM network.',
    category: 'Technical',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=acm&backgroundColor=1d79f5',
    createdBy: 'u3',
    admins: ['u2'],
    contactEmail: 'acm@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/acm_muj',
      linkedin: 'https://linkedin.com/company/acm-muj',
      website: 'https://acm.mujclubs.in',
    },
    status: 'ACTIVE',
    createdAt: '2022-01-20T09:00:00Z',
    updatedAt: '2026-06-15T10:00:00Z',
  },
  {
    id: 'c3',
    name: 'Robotics Club',
    description:
      'From autonomous drones to combat bots, the Robotics Club is where hardware meets code. Weekly build sessions and an annual RoboWars tournament.',
    category: 'Technical',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=robotics&backgroundColor=7c3aed',
    createdBy: 'u3',
    admins: [],
    contactEmail: 'robotics@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/robotics_muj',
      website: 'https://robotics.mujclubs.in',
    },
    status: 'ACTIVE',
    createdAt: '2021-09-05T09:00:00Z',
    updatedAt: '2026-05-20T10:00:00Z',
  },
  {
    id: 'c4',
    name: 'Cultural Committee',
    description:
      'The heart of campus life. We organize Campus Carnival, open mic nights, dance battles, and the annual cultural fest — Revels.',
    category: 'Cultural',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=cultural&backgroundColor=8b5cf6',
    createdBy: 'u3',
    admins: [],
    contactEmail: 'cultural@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/cultural_muj',
    },
    status: 'ACTIVE',
    createdAt: '2020-08-01T09:00:00Z',
    updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'c5',
    name: 'Sports Club',
    description:
      'Inter-hostel tournaments, morning runs, and pick-up games every evening. All skill levels welcome — just show up.',
    category: 'Sports',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=sports&backgroundColor=223b6f',
    createdBy: 'u3',
    admins: [],
    contactEmail: 'sports@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/sports_muj',
    },
    status: 'ACTIVE',
    createdAt: '2020-02-10T09:00:00Z',
    updatedAt: '2026-03-08T10:00:00Z',
  },
  {
    id: 'c6',
    name: 'Developer Community',
    description:
      'A student-run collective for builders. Ship nights, open-source sprints, and CodeStorm — our 12-hour coding showdown.',
    category: 'Technical',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=devcom&backgroundColor=1563e1',
    createdBy: 'u3',
    admins: [],
    contactEmail: 'devcom@muj.manipal.edu',
    socialLinks: {
      instagram: 'https://instagram.com/devcom_muj',
      linkedin: 'https://linkedin.com/company/devcom-muj',
    },
    status: 'ACTIVE',
    createdAt: '2022-11-18T09:00:00Z',
    updatedAt: '2026-07-22T10:00:00Z',
  },
];
