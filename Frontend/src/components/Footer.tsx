import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 text-center">
      

      {/* Social Media Links */}
      <div className="flex space-x-4 justify-center mt-8">
        <Link href="#" className="text-white hover:text-blue transition-colors">
          <Facebook className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link href="#" className="text-white hover:text-blue transition-colors">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link href="#" className="text-white hover:text-blue transition-colors">
          <Instagram className="h-5 w-5" />
          <span className="sr-only">Instagram</span>
        </Link>
      </div>

      {/* Footer Text */}
      <p className="text-sm text-white mt-4">
        Discover unique, handcrafted goods from passionate local artisans.
      </p>
      <p className="text-sm text-white mt-2">&copy; 2025 CraftedNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;