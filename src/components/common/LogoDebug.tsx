
import React, { useState, useEffect } from 'react';

const LogoDebug = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logo.png');

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Logo loaded successfully');
      setLogoLoaded(true);
      setLogoError(false);
    };
    img.onerror = () => {
      console.error('Logo failed to load');
      setLogoError(true);
    };
    img.src = logoUrl;
  }, [logoUrl]);

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="font-bold mb-2">Logo Debug Information</h2>
      <p>Logo Loaded: {logoLoaded ? '✅ Yes' : '❌ No'}</p>
      <p>Logo Load Error: {logoError ? '✅ Yes' : '❌ No'}</p>
      <p>Logo URL tried: {logoUrl}</p>
      <div className="border p-4 my-2 bg-white">
        <img 
          src={logoUrl} 
          alt="Debug Logo" 
          className="h-16 w-16 object-contain"
          onError={() => console.error('Logo failed in debug component')}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Logo uploaded successfully!
      </p>
    </div>
  );
};

export default LogoDebug;
