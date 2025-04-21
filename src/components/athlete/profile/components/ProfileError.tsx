
import React from 'react';

export const ProfileError = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Profile Not Found</h2>
        <p className="text-gray-500 mt-2">The requested profile could not be loaded.</p>
      </div>
    </div>
  );
};
