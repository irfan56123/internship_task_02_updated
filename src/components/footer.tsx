import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shedula</h3>
          <p className="text-sm text-gray-200">
            Shedula is your trusted platform for amazing services and solutions.  
            We aim to deliver quality and innovation in every step.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@myapp.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>

          <div className="flex space-x-4 mt-4">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="mailto:support@myapp.com"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-blue-700 text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Shedula. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
