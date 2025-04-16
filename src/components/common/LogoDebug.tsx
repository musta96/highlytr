
import React, { useState, useEffect } from 'react';

const LogoDebug = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Logo loaded successfully');
      setLogoLoaded(true);
    };
    img.onerror = () => {
      console.error('Logo failed to load');
      setLogoError(true);
    };
    img.src = '/logo.png';
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="font-bold mb-2">Logo Debug Information</h2>
      <p>Logo Loaded: {logoLoaded ? '✅ Yes' : '❌ No'}</p>
      <p>Logo Load Error: {logoError ? '✅ Yes' : '❌ No'}</p>
      <img 
        src="/logo.png" 
        alt="Debug Logo" 
        className="h-16 w-16 object-contain"
        onError={() => console.error('Logo failed in debug component')}
      />
    </div>
  );
};

export default LogoDebug;
