
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: April 16, 2025</p>
        <Separator className="mb-8" />
        
        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to HighLytr. These Terms of Service ("Terms") govern your use of our website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>
            <p className="mb-4">
              Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not use our Services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Use of Our Services</h2>
            <p className="mb-4">
              You may use our Services only as permitted by these Terms and any applicable laws or regulations. You agree not to misuse our Services, interfere with their operation, or attempt to access them using a method other than the interface and instructions we provide.
            </p>
            <p className="mb-4">
              You must be at least 13 years old to use our Services. If you are under 18, you must have your parent or legal guardian's permission to use our Services and they must agree to these Terms on your behalf.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Your HighLytr Account</h2>
            <p className="mb-4">
              To access certain features of our Services, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="mb-4">
              You agree to provide accurate and complete information when creating your account and to update your information as necessary to keep it accurate and complete.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Privacy</h2>
            <p className="mb-4">
              Our Privacy Policy explains how we collect, use, and protect your information when you use our Services. By using our Services, you agree to our collection, use, and disclosure of information as described in our Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Content</h2>
            <p className="mb-4">
              Our Services allow you to upload, submit, store, send, and receive content. You retain ownership of any intellectual property rights that you hold in that content.
            </p>
            <p className="mb-4">
              When you upload, submit, store, send, or receive content to or through our Services, you give HighLytr a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly display and distribute such content for the purpose of operating and improving our Services.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
