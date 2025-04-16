
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
            <h1 className="text-3xl font-bold">Sign In to HighLytr</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please enter your details.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
