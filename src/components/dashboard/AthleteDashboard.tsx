
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AthleteDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Athlete Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Athlete Dashboard</h2>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/3" />
          </div>
          <p className="text-muted-foreground mt-2">Complete your profile to increase visibility (33%)</p>
          <button className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            Complete Your Profile
          </button>
        </div>
        
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3 border rounded-md">
              <span className="text-2xl font-bold">0</span>
              <span className="text-muted-foreground text-sm">Profile Views</span>
            </div>
            <div className="flex flex-col items-center p-3 border rounded-md">
              <span className="text-2xl font-bold">0</span>
              <span className="text-muted-foreground text-sm">College Saves</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Colleges You May Like</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">University A</h3>
          <p className="text-sm text-muted-foreground">Basketball, Division I</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">College B</h3>
          <p className="text-sm text-muted-foreground">Basketball, Division II</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">University C</h3>
          <p className="text-sm text-muted-foreground">Basketball, Division I</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="text-sm">Upload Video</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-sm">Edit Profile</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm">Search Colleges</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-sm">Messages</span>
        </button>
      </div>
    </div>
  );
};

export default AthleteDashboard;
