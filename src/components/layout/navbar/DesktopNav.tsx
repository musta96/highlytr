
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  mainNavItems: Array<{ title: string; href: string }>;
}

const DesktopNav = ({ mainNavItems }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {/* Primary Navigation */}
      {mainNavItems.map((item) => (
        <Link 
          key={item.href}
          to={item.href} 
          className="text-sm font-medium hover:text-highlyt-blue transition-colors"
        >
          {item.title}
        </Link>
      ))}

      {/* Resources Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-sm font-medium hover:text-highlyt-blue transition-colors flex items-center gap-1">
            Resources <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/about" className="w-full">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/how-it-works" className="w-full">How It Works</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/success-stories" className="w-full">Success Stories</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/blog" className="w-full">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/faqs" className="w-full">FAQs</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link to="/pricing" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
        Pricing
      </Link>

      <Link to="/contact" className="text-sm font-medium hover:text-highlyt-blue transition-colors">
        Contact
      </Link>
    </nav>
  );
};

export default DesktopNav;
