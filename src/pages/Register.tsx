
import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join HighLytr today</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
