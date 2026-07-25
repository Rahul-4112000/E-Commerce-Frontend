'use client';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { Table } from '@/shared/components/organisms/Table';
import { AdminService } from '../services/admin.service';
import { useRef, useCallback, useState, useEffect } from 'react';
import { buildQuery } from '../../../shared/utils/utils';
import Pagination from '@mui/material/Pagination';

const initialAdminState = {
  admin: [],
};

const paginationInitialState = {
  page: 1,
  count: 0,
  limit: 10,
  totalPage: 0,
  hasPreviousPage: false,
  hasNextPage: false,
}

const DEBOUNCE_DELAY = 400;

export const AdminTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminList, setAdminData] = useState(initialAdminState);
  const [paginationData, setPaginationData] = useState(paginationInitialState)
  const [isLoading, setIsLoading] = useState(true);
  const debounceTimer = useRef(null);

  const fetchAdmins = useCallback(async (query = '', page = 1) => {
    setIsLoading(true);
    try {
      const result = await AdminService.getAll(
        buildQuery({
          search: query,
          page: page,
          limit: paginationInitialState.limit
        })
      );
      setAdminData(result.data);
      setPaginationData(result.meta)
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleSearch = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        fetchAdmins(query.trim(), 1);
      }, DEBOUNCE_DELAY);
    },
    [fetchAdmins]
  );

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setAdminData((prevState) => (
        prevState.map((adminUser) =>
          adminUser.id === id ? { ...adminUser, isActive: !currentStatus } : adminUser
        )
      ));
      await AdminService.toggleStatus(id, !currentStatus);
    } catch {
      setAdminData((prevState) => (
        prevState.map((adminUser) =>
          adminUser.id === id ? { ...adminUser, isActive: currentStatus } : adminUser
        )
      ));
    }
  };

  const columns = [
    {
      header: 'Name',
      key: 'name',
      render: (admin) => (
        <span className='font-semibold text-gray-900'>
          {admin.name && admin.name.trim() !== '' ? admin.name : '-'}
        </span>
      ),
    },
    {
      header: 'Email',
      key: 'email',
      render: (admin) => <span className='text-gray-500'>{admin.email}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (admin) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${admin.isActive
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-gray-50 text-gray-500 border-gray-200'
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${admin.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
          ></span>
          {admin.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'toggleSwitch',
      render: (admin) => (
        <button
          type='button'
          onClick={() => handleToggleStatus(admin.id, admin.isActive)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${admin.isActive ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          role='switch'
          aria-checked={admin.isActive}
        >
          <span
            aria-hidden='true'
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${admin.isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
          />
        </button>
      ),
    },
  ];

  const handlePageChange = (event, value) => {
    fetchAdmins(searchQuery, value);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-200'>
        <SearchInput placeholder='Search admins...' value={searchQuery} onChange={handleSearch} />
        <div className='text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm'>
          Total: <span className='text-indigo-600 font-semibold'>{paginationData.count}</span>{' '}
          {paginationData.count === 1 ? 'Admin' : 'Admins'}
        </div>
      </div>

      <Table
        columns={columns}
        data={adminList}
        keyExtractor={(item) => item._id}
        isLoading={isLoading}
        loadingMessage={
          <div className='flex items-center justify-center gap-2'>
            <div className='w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin'></div>
            Please wait, getting admins info...
          </div>
        }
      />

      {paginationData.totalPage > 1 && (
        <div className='flex justify-end pt-4'>
          <Pagination
            count={paginationData.totalPage}
            page={paginationData.page}
            variant='outlined'
            color='primary'
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
