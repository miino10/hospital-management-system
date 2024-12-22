import { Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone size={16} />
                <span>Emergency: 911</span>
              </p>
              <p>General: (555) 123-4567</p>
              <p>Email: adnat@hospital.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/careers"
                  className="hover:text-blue-200 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-400 mt-8 pt-8 text-center">
          <p>&copy; 2024 Adna aden Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
