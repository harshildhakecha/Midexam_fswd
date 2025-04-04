import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-bold text-white">ImageCompress</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/upload"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Upload
            </Link>
            <Link
              to="/analytics"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 