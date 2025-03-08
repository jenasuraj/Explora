import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and About Section */}
          <div>
            <h2 className="text-2xl font-semibold">Vlora.ai</h2>
            <p className="text-gray-400 mt-2">
              Empowering the web with modern AI solutions.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-gray-400 mt-2">Email: jenasuraj742@gmail.com</p>
            <p className="text-gray-400">Phone: +91 8260842530</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 pt-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Vlora.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
