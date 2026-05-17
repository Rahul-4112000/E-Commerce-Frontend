import React from 'react';
import { Search, MoreVertical, Edit2, Trash2, ShieldAlert } from 'lucide-react';

export const AdminTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search admins..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white w-64 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500 font-medium">Total: 3 Admins</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Joined Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Mock Row 1 (Super Admin) */}
            <tr className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-sm">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john.super@erath.com</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                  <ShieldAlert size={12} />
                  Super Admin
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Oct 12, 2023
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                  <Edit2 size={16} />
                </button>
              </td>
            </tr>

            {/* Mock Row 2 (Catalog Admin) */}
            <tr className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
                    AS
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Alice Smith</p>
                    <p className="text-sm text-gray-500">alice.catalog@erath.com</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  Catalog Admin
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Jan 04, 2024
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1 cursor-pointer" title="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>

            {/* Mock Row 3 (Pending Invite) */}
            <tr className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold shadow-sm border border-gray-200 border-dashed">
                    ?
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 italic">Pending Invite</p>
                    <p className="text-sm text-gray-500">mark.orders@erath.com</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                  Order Admin
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Just now
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="More Options">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
