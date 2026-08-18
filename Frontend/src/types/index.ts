export type UserRole = 'STUDENT' | 'CLUB_ADMIN' | 'CAMPUS_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  academic?: {
    department?: string;
    year?: number;
  };
  interests?: string[];
  skills?: string[];
  profile?: {
    profilePicture?: string;
    bio?: string;
    phone?: string;
  };
}

export type ClubStatus = 'ACTIVE' | 'INACTIVE';

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  logo?: string;
  createdBy: string;
  admins: string[];
  contactEmail?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  status: ClubStatus;
  createdAt: string;
  updatedAt: string;
}

export type EventCategory =
  | 'TECHNICAL'
  | 'CULTURAL'
  | 'SPORTS'
  | 'ACADEMIC'
  | 'WORKSHOP'
  | 'HACKATHON'
  | 'OTHER';

export type EventStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  club: string;
  category: EventCategory;
  venue: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  capacity: number;
  registeredCount?: number;
  banner?: string;
  status: EventStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type RegistrationStatus = 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED' | 'PENDING';

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  registeredAt: string;
}

export type AnnouncementPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type AnnouncementCategory = 'IMPORTANT' | 'GENERAL' | 'EVENT';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  priority: AnnouncementPriority;
  category: AnnouncementCategory;
}

export type NotificationType =
  | 'REGISTRATION_CONFIRMATION'
  | 'EVENT_REMINDER'
  | 'EVENT_CANCELLATION'
  | 'NEW_ANNOUNCEMENT';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  eventId?: string;
}

export type IssueCategory =
  | 'INFRASTRUCTURE'
  | 'HOSTEL'
  | 'TRANSPORT'
  | 'TECHNICAL'
  | 'CLEANLINESS'
  | 'OTHER';

export type IssueStatus = 'SUBMITTED' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  status: IssueStatus;
  createdAt: string;
  userId: string;
  attachmentName?: string;
}
