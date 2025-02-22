"use client";

import React from "react";
import Link from "next/link";

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-[#2E073F] mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Stats */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#2E073F] mb-4">Blog Statistics</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-semibold">Total Posts:</span>
                <span className="text-[#2E073F]">120</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Total Comments:</span>
                <span className="text-[#2E073F]">345</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Total Users:</span>
                <span className="text-[#2E073F]">850</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Active Posts:</span>
                <span className="text-[#2E073F]">95</span>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#2E073F] mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-semibold">How to Manage a Blog:</span>
                <span className="text-[#2E073F]">Jan 12, 2025</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">The Future of Blogging:</span>
                <span className="text-[#2E073F]">Jan 10, 2025</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Tips for Content Creators:</span>
                <span className="text-[#2E073F]">Jan 8, 2025</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#2E073F] mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <Link
                href="/admin-create-post"
                className="block bg-[#EBD3F8] text-black font-semibold py-3 rounded-md text-center hover:bg-[#2E073F] hover:text-white transition duration-300"
              >
                Create New Post
              </Link>
              <Link
                href="/admin-manage-comments"
                className="block bg-[#EBD3F8] text-black font-semibold py-3 rounded-md text-center hover:bg-[#2E073F] hover:text-white transition duration-300"
              >
                Manage Comments
              </Link>
              <Link
                href="/admin-manage-users"
                className="block bg-[#EBD3F8] text-black font-semibold py-3 rounded-md text-center hover:bg-[#2E073F] hover:text-white transition duration-300"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
