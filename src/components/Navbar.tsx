import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HomeIcon, BookOpenIcon, UserGroupIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 20,
      damping: 10,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 20,
      damping: 10,
    },
  },
};

const linkVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const backdropVariants = {
  open: { opacity: 0.5 },
  closed: { opacity: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-transparent text-white shadow-lg fixed w-full z-50 lg:block hidden">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-semibold hover:text-orange-500 transition-all duration-300 ease-in-out"
            >
              <span className="text-orange-500">Cook with AI</span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`relative group text-white hover:text-orange-500 transition-all duration-300 ease-in-out ${
                  location.pathname === '/' ? 'text-orange-500' : ''
                }`}
              >
                Home
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"
                  animate={{ scaleX: location.pathname === '/' ? 1 : 0 }}
                />
              </Link>
              <Link
                to="/recipe"
                className={`relative group text-white hover:text-orange-500 transition-all duration-300 ease-in-out ${
                  location.pathname === '/recipe' ? 'text-orange-500' : ''
                }`}
              >
                AI Recipe Generator
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"
                  animate={{ scaleX: location.pathname === '/recipe' ? 1 : 0 }}
                />
              </Link>
              <Link
                to="/team"
                className={`relative group text-white hover:text-orange-500 transition-all duration-300 ease-in-out ${
                  location.pathname === '/team' ? 'text-orange-500' : ''
                }`}
              >
                Done By
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out"
                  animate={{ scaleX: location.pathname === '/team' ? 1 : 0 }}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-white focus:outline-none bg-orange-500 bg-opacity-50 backdrop-blur-sm"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Side Navbar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={closeMenu}
            />
            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-orange-600 text-white z-50 shadow-lg flex flex-col"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <div className="p-6 flex items-center justify-between">
                <Link
                  to="/"
                  className="text-xl font-semibold"
                  onClick={closeMenu}
                >
                  <span className="text-yellow-300">AI</span>Cook
                </Link>
                <button onClick={closeMenu} className="focus:outline-none">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    animate: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <motion.div variants={linkVariants}>
                    <Link
                      to="/"
                      className={`flex items-center space-x-3 p-3 rounded-md hover:bg-orange-500 transition-colors ${
                        location.pathname === '/' ? 'bg-orange-500' : ''
                      }`}
                      onClick={closeMenu}
                    >
                      <HomeIcon className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={linkVariants}>
                    <Link
                      to="/recipe"
                      className={`flex items-center space-x-3 p-3 rounded-md hover:bg-orange-500 transition-colors ${
                        location.pathname === '/recipe' ? 'bg-orange-500' : ''
                      }`}
                      onClick={closeMenu}
                    >
                      <BookOpenIcon className="h-5 w-5" />
                      <span>AI Recipe Generator</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={linkVariants}>
                    <Link
                      to="/team"
                      className={`flex items-center space-x-3 p-3 rounded-md hover:bg-orange-500 transition-colors ${
                        location.pathname === '/team' ? 'bg-orange-500' : ''
                      }`}
                      onClick={closeMenu}
                    >
                      <UserGroupIcon className="h-5 w-5" />
                      <span>Done By</span>
                    </Link>
                  </motion.div>
                  {/* Add more links here */}
                </motion.div>
              </nav>
              <div className="p-4 text-sm text-gray-300">
                © {new Date().getFullYear()} Cook with AI
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}