export interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: JobStatus;
  appliedDate: string;
  description?: string;
  notes?: string;
  url?: string;
  contactPerson?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 
  | 'applied' 
  | 'screening' 
  | 'interview' 
  | 'technical' 
  | 'final' 
  | 'offer' 
  | 'rejected' 
  | 'withdrawn';

export interface Interview {
  id: string;
  jobId: string;
  type: InterviewType;
  date: string;
  time: string;
  interviewer?: string;
  notes?: string;
  feedback?: string;
  status: InterviewStatus;
  createdAt: string;
}

export type InterviewType = 'phone' | 'video' | 'onsite' | 'technical';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Company {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  website?: string;
  notes?: string;
}

export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offers: number;
  rejections: number;
  responseRate: number;
}