import { PAGE_ROUTES } from '@/shared/utils/constants';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-center">
          <div className="bg-red-50 p-4 rounded-full">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Access Denied</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href={PAGE_ROUTES.HOME}
            className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:ring-4 focus:ring-gray-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
