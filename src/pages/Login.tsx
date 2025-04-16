
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import LogoDebug from '@/components/common/LogoDebug';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <img 
                src="/logo.png" 
                alt="HighLytr Logo" 
                className="h-10 w-10 rounded-full object-contain"
                onError={(e) => { 
                  console.error('Logo failed to load', e);
                  e.currentTarget.src = '/placeholder.svg'; 
                }}
              />
              <span className="font-bold text-2xl">HighLytr</span>
            </Link>
          </div>
          <LoginForm />
          <div className="mt-8">
            <LogoDebug />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
