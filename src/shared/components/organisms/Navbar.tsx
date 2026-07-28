'use client';

import React from 'react';
import { useApi } from '@/shared/hooks/use.api';
import { getMe } from '@/feature/user/api/user.client';
import { Avatar, Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

const PAGE_TITLE_MAP: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/orders': 'Orders',
  '/dashboard/products': 'Products',
  '/dashboard/categories': 'Categories',
  '/dashboard/customers': 'Customers',
  '/dashboard/admins': 'Admins',
  '/dashboard/settings': 'Settings',
};

export const Navbar = () => {
  const pathname = usePathname();
  const { data: profileData } = useApi(getMe, { immediate: true });
  const user = profileData?.data?.user;

  const avatarSrc = user?.avatar || '';
  const displayName = user?.name || 'User';

  const pageTitle =
    Object.entries(PAGE_TITLE_MAP)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([path]) => pathname === path || pathname.startsWith(path + '/'))?.[1] ?? 'Dashboard';

  return (
    <Box
      component="header"
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        px: 3,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
        {pageTitle}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
            {displayName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize' }}>
            {user?.role?.replace('_', ' ') ?? ''}
          </Typography>
        </Box>
        <Avatar
          src={avatarSrc || undefined}
          alt={displayName}
          sx={{ width: 36, height: 36, bgcolor: '#4f46e5', fontSize: 14 }}
        >
          {!avatarSrc && displayName.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
    </Box>
  );
};
