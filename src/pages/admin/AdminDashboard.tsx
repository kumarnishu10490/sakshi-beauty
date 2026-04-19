import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin/services" className="hover:bg-gray-800 p-2 rounded">
            Manage Services
          </Link>

          <Link to="/admin/gallery" className="hover:bg-gray-800 p-2 rounded">
            Manage Gallery
          </Link>

          <Link to="/admin/courses" className="hover:bg-gray-800 p-2 rounded">
            Manage Courses
          </Link>

          <Link to="/admin/messages" className="hover:bg-gray-800 p-2 rounded">
            Contact Messages
          </Link>

          <Link to="/" className="hover:bg-red-600 p-2 rounded mt-10">
            Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <a href="/admin/services">Manage salon services</a>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Services</h2>
            <p className="text-gray-500 mt-2">Manage salon services</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Gallery</h2>
            <p className="text-gray-500 mt-2">Upload salon images</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className="text-gray-500 mt-2">Manage training courses</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Messages</h2>
            <p className="text-gray-500 mt-2">Customer inquiries</p>
          </div>

        </div>
      </div>

    </div>
  );
}