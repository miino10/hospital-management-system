"use client";
import { Hospital, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Hospital
              className={`h-8 w-8 ${
                isScrolled ? "text-blue-600" : "text-white"
              }`}
            />
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-blue-600" : "text-white"
              }`}>
              Adna Aden Hospital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {["Home", "Services", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`${
                      isScrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-blue-200"
                    } transition-colors`}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`flex items-center space-x-1 ${
                    isScrolled
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  } px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}>
                  <User size={16} />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className={isScrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden bg-white border-t mt-2">
            <ul className="py-4">
              {["Home", "Services", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="px-4 py-2">
                <Link
                  href="/patient-login"
                  className="flex items-center space-x-2 text-blue-600"
                  onClick={() => setIsOpen(false)}>
                  <User size={16} />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
