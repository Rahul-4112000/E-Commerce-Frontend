'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { usePathname, useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/shared/utils/constants';
import { useApi } from '@/shared/hooks/use.api';
import { getMe } from '@/feature/user/api/user.client';
import { authService } from '@/feature/auth/services/auth.api.service';
import { showToast } from '@/shared/utils/toast.util';
import { Modal } from '@/shared/components/Modal';

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 72;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: PAGE_ROUTES.DASHBOARD.HOME },
  { label: 'Orders', icon: <ShoppingCartIcon />, href: PAGE_ROUTES.DASHBOARD.ORDERS },
  { label: 'Products', icon: <Inventory2Icon />, href: PAGE_ROUTES.DASHBOARD.PRODUCTS },
  { label: 'Categories', icon: <CategoryIcon />, href: PAGE_ROUTES.DASHBOARD.CATEGORIES },
  { label: 'Customers', icon: <PeopleIcon />, href: PAGE_ROUTES.DASHBOARD.CUSTOMERS },
  { label: 'Admins', icon: <AdminPanelSettingsIcon />, href: PAGE_ROUTES.DASHBOARD.ADMINS },
];

const BOTTOM_NAV_ITEMS = [
  { label: 'Settings', icon: <SettingsIcon />, href: PAGE_ROUTES.DASHBOARD.SETTINGS },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: profileData } = useApi(getMe, { immediate: true });
  const user = profileData?.data?.user;

  const avatarSrc = user?.avatar || '';
  const displayName = user?.name || 'User';
  const displayRole = user?.role
    ? user.role.replace('_', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
    : '';

  const drawerWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await authService.logout();
      if (res.success) {
        router.push(PAGE_ROUTES.AUTH.LOGIN);
      }
    } catch {
      showToast.error('Something went wrong');
    } finally {
      setIsLoggingOut(false);
      setLogoutModalOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === PAGE_ROUTES.DASHBOARD.HOME) return pathname === href;
    return pathname.startsWith(href);
  };

  const navItemSx = (active: boolean, isCollapsed: boolean) => ({
    borderRadius: 2,
    px: isCollapsed ? 1.5 : 2,
    minHeight: 44,
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    '&.Mui-selected': {
      bgcolor: '#ede9fe',
      color: '#4f46e5',
      '& .MuiListItemIcon-root': { color: '#4f46e5' },
      '&:hover': { bgcolor: '#e0d9fc' },
    },
    '&:hover': { bgcolor: active ? '#e0d9fc' : '#f9fafb' },
    color: '#374151',
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fb' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: 'width 0.2s ease',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            borderRight: '1px solid #f0f0f0',
            overflowX: 'hidden',
            transition: 'width 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Brand + Toggle */}
        <Box
          sx={{
            px: collapsed ? 1.5 : 2.5,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            minHeight: 64,
          }}
        >
          {!collapsed && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: '#4f46e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                ER
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>
                eRath
              </Typography>
            </Box>
          )}
          <IconButton
            size="small"
            onClick={() => setCollapsed((p) => !p)}
            sx={{ color: '#6b7280', '&:hover': { bgcolor: '#f3f4f6' } }}
          >
            {collapsed ? <MenuIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: '#f3f4f6' }} />

        {/* Main nav */}
        <List sx={{ px: 1, pt: 1, flexGrow: 1 }} disablePadding>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={collapsed ? item.label : ''} placement="right">
                  <ListItemButton
                    onClick={() => router.push(item.href)}
                    selected={active}
                    sx={navItemSx(active, collapsed)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 36,
                        color: active ? '#4f46e5' : '#9ca3af',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            style: { fontSize: 14, fontWeight: active ? 600 : 500 },
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: '#f3f4f6' }} />

        {/* Bottom nav */}
        <List sx={{ px: 1, py: 1 }} disablePadding>
          {BOTTOM_NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={collapsed ? item.label : ''} placement="right">
                  <ListItemButton
                    onClick={() => router.push(item.href)}
                    selected={active}
                    sx={navItemSx(active, collapsed)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 36,
                        color: active ? '#4f46e5' : '#9ca3af',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            style: { fontSize: 14, fontWeight: active ? 600 : 500 },
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}

          {/* Logout */}
          <ListItem disablePadding>
            <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
              <ListItemButton
                onClick={() => setLogoutModalOpen(true)}
                sx={{
                  borderRadius: 2,
                  px: collapsed ? 1.5 : 2,
                  minHeight: 44,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color: '#ef4444',
                  '&:hover': { bgcolor: '#fef2f2' },
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: '#ef4444' }}>
                  <LogoutIcon />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary="Logout"
                    slotProps={{ primary: { style: { fontSize: 14, fontWeight: 500 } } }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>

        <Divider sx={{ borderColor: '#f3f4f6' }} />

        {/* User profile strip */}
        <Box
          sx={{
            px: collapsed ? 1 : 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            justifyContent: collapsed ? 'center' : 'flex-start',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f9fafb' },
          }}
          onClick={() => router.push(PAGE_ROUTES.DASHBOARD.SETTINGS)}
        >
          <Avatar
            src={avatarSrc || undefined}
            alt={displayName}
            sx={{ width: 36, height: 36, bgcolor: '#4f46e5', fontSize: 14, flexShrink: 0 }}
          >
            {!avatarSrc && displayName.charAt(0).toUpperCase()}
          </Avatar>
          {!collapsed && (
            <Box sx={{ overflow: 'hidden' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#111827' }} noWrap>
                {displayName}
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize' }} noWrap>
                {displayRole}
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>

      {/* Logout confirmation modal */}
      {logoutModalOpen && (
        <Modal
          title="Confirm Logout"
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogout}
          confirmLabel="Logout"
          isLoading={isLoggingOut}
        >
          Are you sure you want to log out? You will need to sign in again to access your account.
        </Modal>
      )}
    </Box>
  );
};
