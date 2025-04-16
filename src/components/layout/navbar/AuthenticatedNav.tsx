
import React from 'react';
import { Link } from 'react-router-dom';
import { AccountType } from '@/components/auth/types';

interface AuthenticatedNavProps {
  accountType: AccountType | null;
}

const AuthenticatedNav = ({ accountType }: AuthenticatedNavProps) => {
  // Base navigation links that all authenticated users see
  const baseLinks = [
    { title: 'Messages', href: '/dashboard/messages' },
    { title: 'Connections', href: '/dashboard/connections' },
    { title: 'Analytics', href: '/analytics' },
  ];

  // Role-specific navigation links
  const roleLinks = {
    athlete: [
      { title: 'Discover Colleges', href: '/dashboard/colleges/search' },
      { title: 'Highlights', href: '/dashboard/highlights' },
    ],
    college: [
      { title: 'Find Athletes', href: '/dashboard/athletes/search' },
      { title: 'Teams', href: '/dashboard/teams' },
    ],
    agency: [
      { title: 'My Athletes', href: '/dashboard/represented' },
      { title: 'Placements', href: '/dashboard/placements' },
    ]
  };

  // Get the appropriate links based on account type
  const typeSpecificLinks = accountType?.toLowerCase() === 'athlete' 
    ? roleLinks.athlete 
    : accountType?.toLowerCase() === 'college'
    ? roleLinks.college
    : accountType?.toLowerCase() === 'agency' 
    ? roleLinks.agency 
    : [];

  const navLinks = [...baseLinks, ...typeSpecificLinks];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className="text-sm font-medium hover:text-highlyt-blue transition-colors"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default AuthenticatedNav;
