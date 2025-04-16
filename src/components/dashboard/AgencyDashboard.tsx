
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AgencyDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agency Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Agency Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Athletes Represented</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>College Conversations</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending Placements</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Placement Funnel</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Initial Contact</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>In Discussions</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Offers Made</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Placed</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Your Athletes</h2>
      <p className="text-muted-foreground">You don't have any athletes yet. Add athletes to get started.</p>
      
      <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="text-sm">Add Athlete</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
          <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-sm">Edit Profiles</span>
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

export default AgencyDashboard;
