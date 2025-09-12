import { Job, Interview, Company } from './types';

const JOBS_KEY = 'job-tracker-jobs';
const INTERVIEWS_KEY = 'job-tracker-interviews';
const COMPANIES_KEY = 'job-tracker-companies';

// Jobs
export const getJobs = (): Job[] => {
  const jobs = localStorage.getItem(JOBS_KEY);
  return jobs ? JSON.parse(jobs) : [];
};

export const saveJob = (job: Job): void => {
  const jobs = getJobs();
  const existingIndex = jobs.findIndex(j => j.id === job.id);
  
  if (existingIndex >= 0) {
    jobs[existingIndex] = { ...job, updatedAt: new Date().toISOString() };
  } else {
    jobs.push({ ...job, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
};

export const deleteJob = (id: string): void => {
  const jobs = getJobs().filter(job => job.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  
  // Also delete related interviews
  const interviews = getInterviews().filter(interview => interview.jobId !== id);
  localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(interviews));
};

// Interviews
export const getInterviews = (): Interview[] => {
  const interviews = localStorage.getItem(INTERVIEWS_KEY);
  return interviews ? JSON.parse(interviews) : [];
};

export const saveInterview = (interview: Interview): void => {
  const interviews = getInterviews();
  const existingIndex = interviews.findIndex(i => i.id === interview.id);
  
  if (existingIndex >= 0) {
    interviews[existingIndex] = interview;
  } else {
    interviews.push({ ...interview, createdAt: new Date().toISOString() });
  }
  
  localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(interviews));
};

export const deleteInterview = (id: string): void => {
  const interviews = getInterviews().filter(interview => interview.id !== id);
  localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(interviews));
};

// Companies
export const getCompanies = (): Company[] => {
  const companies = localStorage.getItem(COMPANIES_KEY);
  return companies ? JSON.parse(companies) : [];
};

export const saveCompany = (company: Company): void => {
  const companies = getCompanies();
  const existingIndex = companies.findIndex(c => c.id === company.id);
  
  if (existingIndex >= 0) {
    companies[existingIndex] = company;
  } else {
    companies.push(company);
  }
  
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
};

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getJobsByStatus = (status: string): Job[] => {
  return getJobs().filter(job => job.status === status);
};

export const getUpcomingInterviews = (): Interview[] => {
  const today = new Date();
  return getInterviews()
    .filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate >= today && interview.status === 'scheduled';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getDashboardStats = () => {
  const jobs = getJobs();
  const interviews = getInterviews();
  
  return {
    totalApplications: jobs.length,
    activeApplications: jobs.filter(job => !['rejected', 'withdrawn', 'offer'].includes(job.status)).length,
    interviews: interviews.filter(i => i.status === 'scheduled').length,
    offers: jobs.filter(job => job.status === 'offer').length,
    rejections: jobs.filter(job => job.status === 'rejected').length,
    responseRate: jobs.length > 0 ? Math.round((jobs.filter(job => job.status !== 'applied').length / jobs.length) * 100) : 0
  };
};