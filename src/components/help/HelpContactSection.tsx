
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HelpContactSection = () => {
  return (
    <div className="bg-highlyt-gray rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
      <p className="text-gray-600 mb-6">
        Can't find the answer you're looking for? Our support team is here to help.
      </p>
      <div className="flex justify-center">
        <Button asChild>
          <Link to="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
};

export default HelpContactSection;
