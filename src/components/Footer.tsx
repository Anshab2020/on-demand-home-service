import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary mb-4 inline-block">
              HomeServe
            </Link>
            <p className="text-foreground/70 mb-4">
              Connecting homeowners with trusted professionals for all home maintenance and improvement needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/providers" className="text-foreground/70 hover:text-primary transition-colors">
                  Professionals
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/plumbing" className="text-foreground/70 hover:text-primary transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-foreground/70 hover:text-primary transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/services/cleaning" className="text-foreground/70 hover:text-primary transition-colors">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/painting" className="text-foreground/70 hover:text-primary transition-colors">
                  Painting
                </Link>
              </li>
              <li>
                <Link to="/services/gardening" className="text-foreground/70 hover:text-primary transition-colors">
                  Gardening
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-foreground/70 mb-4">
              Stay updated with our latest news and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button className="rounded-r-full px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HomeServe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-foreground/60 hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-foreground/60 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-foreground/60 hover:text-primary transition-colors text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
