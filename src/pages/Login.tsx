
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
                <span className="sr-only">HighLytr</span>
              </div>
              <span className="font-bold text-2xl">HighLytr</span>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
