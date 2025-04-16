
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: April 16, 2025</p>
        <Separator className="mb-8" />
        
        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              At HighLytr, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, or make purchases through the Services.
            </p>
            <p className="mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your name, email address, and phone number</li>
              <li>Username and password</li>
              <li>Profile information (such as profile photos)</li>
              <li>Athletic information (such as sports, positions, statistics)</li>
              <li>Academic information (such as GPA, test scores)</li>
              <li>Billing and payment information</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect about you for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and administrative messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve the Services</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Sharing of Information</h2>
            <p className="mb-4">
              We may share the information we collect about you as follows:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With colleges, coaches, and recruiters, if you are an athlete using our platform</li>
              <li>With athletes, if you are a college, coach, or recruiter using our platform</li>
              <li>With service providers, consultants, and other third parties who perform services on our behalf</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
              <li>If we believe disclosure is necessary to comply with any applicable law, regulation, legal process, or governmental request</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
