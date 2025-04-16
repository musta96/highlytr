
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">HighLytr</span>
      </Link>
    </div>
  );
};

export default NavLogo;
