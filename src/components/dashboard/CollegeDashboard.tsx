
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CollegeDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">College Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recruiting Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Scouting Lists</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Viewed Athletes</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Unanswered Messages</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Roster Needs Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Guards</span>
                <span>1/3</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/3" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Forwards</span>
                <span>0/2</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-0" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Centers</span>
                <span>0/1</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Suggested Athletes</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">Point Guard, 6'2"</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">Jane Smith</h3>
          <p className="text-sm text-muted-foreground">Shooting Guard, 5'11"</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-32 bg-muted rounded-md mb-3"></div>
          <h3 className="font-semibold">Mike Johnson</h3>
          <p className="text-sm text-muted-foreground">Forward, 6'7"</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm">Search Athletes</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm">Create List</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-sm">Inbox</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-sm">Edit Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CollegeDashboard;
