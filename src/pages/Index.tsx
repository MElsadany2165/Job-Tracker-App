import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock,
  Plus,
  ExternalLink
} from 'lucide-react';
import { Job, Interview } from '@/lib/types';
import { getJobs, getInterviews, getDashboardStats, getUpcomingInterviews } from '@/lib/storage';
import JobList from '@/components/JobList';
import Analytics from '@/components/Analytics';
import JobForm from '@/components/JobForm';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);
  const [stats, setStats] = useState(getDashboardStats());

  const loadData = () => {
    const jobsData = getJobs();
    const interviewsData = getInterviews();
    const upcomingData = getUpcomingInterviews();
    
    setJobs(jobsData);
    setInterviews(interviewsData);
    setUpcomingInterviews(upcomingData);
    setStats(getDashboardStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const recentJobs = jobs
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getJobById = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const statusColors = {
    applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    screening: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    interview: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    technical: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    final: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    withdrawn: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Job Tracker Dashboard
            </h1>
            <JobForm onSave={loadData} />
          </div>
          <p className="text-muted-foreground">
            Organize your job search and track your applications efficiently
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Applications</p>
                      <p className="text-3xl font-bold text-green-600">{stats.activeApplications}</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.interviews}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.responseRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Applications
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No applications yet</p>
                      <JobForm 
                        onSave={loadData}
                        trigger={
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Job
                          </Button>
                        }
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentJobs.map(job => (
                        <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium">{job.position}</p>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[job.status]}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                            {job.url && (
                              <Button variant="ghost" size="sm" onClick={() => window.open(job.url, '_blank')}>
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingInterviews.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No upcoming interviews</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingInterviews.slice(0, 5).map(interview => {
                        const job = getJobById(interview.jobId);
                        return (
                          <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <p className="font-medium">{job?.position || 'Unknown Position'}</p>
                              <p className="text-sm text-muted-foreground">{job?.company || 'Unknown Company'}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(interview.date)} at {interview.time}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <JobForm 
                    onSave={loadData}
                    trigger={
                      <Button className="h-20 flex-col">
                        <Plus className="w-6 h-6 mb-2" />
                        Add Application
                      </Button>
                    }
                  />
                  <Button variant="outline" className="h-20 flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    Add Contact
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <JobList jobs={jobs} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics jobs={jobs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}