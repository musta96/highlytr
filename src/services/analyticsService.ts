import { MessageSquare, Eye, Video, Calendar, Mail, Phone, School } from 'lucide-react';

// Helper function to generate dates for the last X days
const generateDates = (days: number): string[] => {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return result;
}

// Convert date range to number of days
const dateRangeToDays = (range: '7d' | '30d' | '90d' | '1y'): number => {
  switch (range) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '1y': return 365;
    default: return 30;
  }
}

// Generate trend data for charts
export const getTrendData = (dateRange: '7d' | '30d' | '90d' | '1y', type: 'recruitment' | 'engagement' | 'performance'): any[] => {
  const days = dateRangeToDays(dateRange);
  const dates = generateDates(days > 30 ? 30 : days); // Only show max 30 data points in chart
  
  return dates.map((date, index) => {
    // Create some variance in data
    const variance = Math.sin(index * 0.5) * 3 + Math.random() * 2;
    const dayOfWeek = index % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const baseProfileViews = isWeekend ? 5 : 8;
    const baseMessages = isWeekend ? 2 : 4;
    const baseVideoViews = isWeekend ? 3 : 6;
    
    // Add some trends over time
    const trendFactor = index / dates.length * 5;
    
    return {
      date,
      profileViews: Math.max(0, Math.round(baseProfileViews + variance + trendFactor)),
      messages: Math.max(0, Math.round(baseMessages + variance * 0.5 + trendFactor * 0.7)),
      videoViews: Math.max(0, Math.round(baseVideoViews + variance * 0.7 + trendFactor * 0.5)),
    };
  });
}

// Get college interest data for pie chart
export const getCollegeInterestData = (dateRange: '7d' | '30d' | '90d' | '1y'): any[] => {
  // More colleges show interest as time range increases
  const factor = dateRange === '7d' ? 1 : dateRange === '30d' ? 1.5 : dateRange === '90d' ? 2 : 2.5;
  
  return [
    { name: 'West Coast', value: Math.round(12 * factor) },
    { name: 'Midwest', value: Math.round(8 * factor) },
    { name: 'East Coast', value: Math.round(10 * factor) },
    { name: 'South', value: Math.round(6 * factor) }
  ];
}

// Get recruiter activity data
export const getRecruiterData = (dateRange: '7d' | '30d' | '90d' | '1y'): any[] => {
  const baseSample = [
    {
      recruiterName: 'Coach Johnson',
      college: 'Stanford University',
      interestLevel: 'High',
      lastActivity: '2 days ago',
      activityDescription: 'Viewed your profile and highlight videos 3 times'
    },
    {
      recruiterName: 'Coach Williams',
      college: 'UCLA',
      interestLevel: 'Medium',
      lastActivity: '1 week ago',
      activityDescription: 'Sent you a message about upcoming showcases'
    },
    {
      recruiterName: 'Coach Miller',
      college: 'University of Michigan',
      interestLevel: 'Medium',
      lastActivity: '2 weeks ago',
      activityDescription: 'Requested your academic transcripts'
    }
  ];
  
  // Return different samples based on date range
  switch (dateRange) {
    case '7d':
      return baseSample.slice(0, 1);
    case '30d':
      return baseSample.slice(0, 2);
    default:
      return baseSample;
  }
}

// Get timeline event data
export const getTimelineData = (dateRange: '7d' | '30d' | '90d' | '1y'): any[] => {
  const baseEvents = [
    {
      date: 'April 15, 2025',
      title: 'Profile View',
      type: 'View',
      description: 'Coach Johnson from Stanford University viewed your profile',
      iconType: 'Eye',
      details: 'Spent 4 minutes on your page and viewed all highlight videos'
    },
    {
      date: 'April 12, 2025',
      title: 'New Message',
      type: 'Message',
      description: 'You received a message from UCLA coach about your recent game performance',
      iconType: 'MessageSquare',
      details: null
    },
    {
      date: 'April 8, 2025',
      title: 'Video View',
      type: 'View',
      description: 'Your championship game highlight received 5 new views',
      iconType: 'Video',
      details: null
    },
    {
      date: 'April 1, 2025',
      title: 'Campus Visit Invitation',
      type: 'Event',
      description: 'University of Michigan invited you for a campus visit and team practice',
      iconType: 'School',
      details: 'Scheduled for May 15, 2025'
    },
    {
      date: 'March 20, 2025',
      title: 'Phone Call',
      type: 'Call',
      description: 'Call with Coach Peterson from Oregon State University',
      iconType: 'Phone',
      details: 'Discussed scholarship opportunities and team fit'
    }
  ];
  
  // Return different events based on date range
  switch (dateRange) {
    case '7d':
      return baseEvents.slice(0, 2);
    case '30d':
      return baseEvents.slice(0, 4);
    default:
      return baseEvents;
  }
}
