
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-highlyt-gray mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
                <span className="sr-only">HighLytr</span>
              </div>
              <span className="font-bold text-xl">HighLytr</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Connecting international high school athletes with U.S. college coaches and sports programs.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Email:</span>
                <a href="mailto:mustarelli.edoardo@gmail.com" className="hover:text-highlyt-blue transition-colors">
                  mustarelli.edoardo@gmail.com
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Phone:</span>
                <a href="tel:+393318395345" className="hover:text-highlyt-blue transition-colors">
                  +39 331 839 5345
                </a>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <span className="font-medium mr-2">Location:</span>
                <span>Milan, Italy</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/athletes" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Athletes
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/agencies" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Agencies
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <a href="mailto:mustarelli.edoardo@gmail.com" className="text-sm text-gray-600 hover:text-highlyt-blue transition-colors">
                  mustarelli.edoardo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} HighLytr. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="https://www.linkedin.com/company/highlytr/about/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlyt-blue transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>

              <a href="https://www.instagram.com/high_lytr/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlyt-blue transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>

              <a href="https://www.youtube.com/@highlytr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlyt-blue transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>

              <a href="https://www.facebook.com/HighLytr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-highlyt-blue transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
