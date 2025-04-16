
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center space-x-2">
        <img 
          src="/logo.png" 
          alt="HighLytr Logo" 
          className="h-8 w-8 rounded-full object-contain"
          onError={(e) => { 
            console.error('Logo failed to load', e);
            e.currentTarget.src = '/placeholder.svg'; 
          }}
        />
        <span className="font-bold text-xl hidden sm:inline-block">HighLytr</span>
      </Link>
    </div>
  );
};

export default NavLogo;
