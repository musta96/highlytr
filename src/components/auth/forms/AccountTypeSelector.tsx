
import React from 'react';
import { AccountType } from '../types';

interface AccountTypeSelectorProps {
  accountType: AccountType;
  onChange: (type: AccountType) => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ 
  accountType, 
  onChange 
}) => {
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <div 
        className={`border rounded-lg p-3 cursor-pointer transition-all ${
          accountType === 'athlete' 
            ? 'border-highlyt-blue bg-highlyt-blue/5' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onChange('athlete')}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            accountType === 'athlete' ? 'bg-highlyt-blue text-white' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Athlete</span>
        </div>
      </div>

      <div 
        className={`border rounded-lg p-3 cursor-pointer transition-all ${
          accountType === 'college' 
            ? 'border-highlyt-blue bg-highlyt-blue/5' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onChange('college')}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            accountType === 'college' ? 'bg-highlyt-blue text-white' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <span className="text-sm font-medium">College</span>
        </div>
      </div>

      <div 
        className={`border rounded-lg p-3 cursor-pointer transition-all ${
          accountType === 'agency' 
            ? 'border-highlyt-blue bg-highlyt-blue/5' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onChange('agency')}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
            accountType === 'agency' ? 'bg-highlyt-blue text-white' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Agency</span>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
