'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Box, CircularProgress, Divider, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useApi } from '@/shared/hooks/use.api';
import { getMe, updateProfile, changePassword } from '@/feature/user/api/user.client';
import { showToast } from '@/shared/utils/toast.util';
import { FormField } from '@/shared/components/molecules/FormField';
import { Button } from '@/shared/components/atoms/Button';
import { Navbar } from '@/shared/components/organisms/Navbar';

const DEFAULT_AVATAR = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234f46e5'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%23a5b4fc'/%3E%3Cellipse cx='20' cy='36' rx='12' ry='8' fill='%23a5b4fc'/%3E%3C/svg%3E`;

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function roleBadge(role: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    super_admin: { label: 'Super Admin', color: '#7c3aed', bg: '#ede9fe' },
    admin: { label: 'Admin', color: '#2563eb', bg: '#dbeafe' },
    user: { label: 'User', color: '#059669', bg: '#d1fae5' },
  };
  const s = map[role] ?? { label: role, color: '#374151', bg: '#f3f4f6' };
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        color: s.color,
        background: s.bg,
      }}
    >
      {s.label}
    </span>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 10px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        color: isActive ? '#059669' : '#dc2626',
        background: isActive ? '#d1fae5' : '#fee2e2',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isActive ? '#059669' : '#dc2626',
          display: 'inline-block',
        }}
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 3,
        border: '1px solid #f0f0f0',
        overflow: 'hidden',
        mb: 3,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: '1px solid #f5f5f5',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box sx={{ color: '#4f46e5' }}>{icon}</Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{title}</Typography>
          <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>{subtitle}</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
}

export default function SettingsPage() {
  const { data: profileData, isLoading, setData } = useApi(getMe, { immediate: true });
  const user = profileData?.data?.user;

  const [profileForm, setProfileForm] = useState({ name: '', phone: '', avatar: '' });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name ?? '',
        phone: user.phone ?? '',
        avatar: user.avatar ?? '',
      });
    }
  }, [user]);

  const validateProfile = () => {
    const errs: Record<string, string> = {};
    if (!profileForm.name.trim()) errs.name = 'Name is required';
    if (profileForm.name.trim().length > 50) errs.name = 'Name cannot exceed 50 characters';
    if (profileForm.phone && profileForm.phone.length > 20)
      errs.phone = 'Phone cannot exceed 20 characters';
    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) return;
    try {
      setIsSavingProfile(true);
      const res = await updateProfile({
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
        avatar: profileForm.avatar.trim(),
      });
      if (res?.data?.user) {
        setData((prev) => (prev ? { ...prev, data: { user: res.data.user } } : prev));
      }
      showToast.success('Profile updated successfully');
    } catch (err: unknown) {
      showToast.error(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const validatePassword = () => {
    const errs: Record<string, string> = {};
    if (!passwordForm.currentPassword) errs.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) errs.newPassword = 'New password is required';
    else if (passwordForm.newPassword.length < 5)
      errs.newPassword = 'Password must be at least 5 characters';
    else if (passwordForm.newPassword.length > 20)
      errs.newPassword = 'Password cannot exceed 20 characters';
    if (!passwordForm.confirmPassword) errs.confirmPassword = 'Please confirm your new password';
    else if (passwordForm.newPassword !== passwordForm.confirmPassword)
      errs.confirmPassword = "Passwords don't match";
    setPasswordErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;
    try {
      setIsSavingPassword(true);
      await changePassword(passwordForm);
      showToast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
    } catch (err: unknown) {
      showToast.error(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const avatarDisplay = profileForm.avatar || user?.avatar || DEFAULT_AVATAR;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#4f46e5' }} />
          </Box>
        ) : (
          <>
            {/* ── Profile Information ──────────────────────────────────── */}
            <SectionCard
              title="Profile Information"
              subtitle="Update your personal details and photo"
              icon={<PersonIcon />}
            >
              <form onSubmit={handleProfileSave} noValidate>
                {/* Avatar row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar
                      src={avatarDisplay}
                      alt={profileForm.name || 'User'}
                      sx={{ width: 72, height: 72, bgcolor: '#4f46e5', fontSize: 24 }}
                    >
                      {!avatarDisplay && (profileForm.name?.charAt(0).toUpperCase() ?? 'U')}
                    </Avatar>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        bgcolor: '#4f46e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #fff',
                      }}
                    >
                      <CameraAltIcon sx={{ fontSize: 12, color: '#fff' }} />
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                      {profileForm.name || 'Your Name'}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#9ca3af' }}>
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Name */}
                <FormField
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                  error={profileErrors.name}
                />

                {/* Email (readonly) */}
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={user?.email ?? ''}
                  readOnly
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />

                {/* Phone */}
                <FormField
                  label="Phone"
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                  error={profileErrors.phone}
                />

                {/* Read-only info grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    mt: 1,
                    mb: 3,
                    p: 2,
                    bgcolor: '#f9fafb',
                    borderRadius: 2,
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#9ca3af', mb: 0.5 }}>Role</Typography>
                    {user?.role ? roleBadge(user.role) : '—'}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#9ca3af', mb: 0.5 }}>Status</Typography>
                    {user !== undefined ? <StatusBadge isActive={user.isActive} /> : '—'}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#9ca3af', mb: 0.5 }}>Last Login</Typography>
                    <Typography sx={{ fontSize: 12, color: '#374151' }}>
                      {formatDate(user?.lastLogin ?? null)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#9ca3af', mb: 0.5 }}>Joined</Typography>
                    <Typography sx={{ fontSize: 12, color: '#374151' }}>
                      {formatDate(user?.createdAt ?? null)}
                    </Typography>
                  </Box>
                </Box>

                <Button type="submit" disabled={isSavingProfile} className="flex items-center gap-2">
                  {isSavingProfile ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <CheckCircleOutlinedIcon sx={{ fontSize: 18 }} />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </SectionCard>

            {/* ── Security ─────────────────────────────────────────────── */}
            <SectionCard
              title="Security"
              subtitle="Change your account password"
              icon={<LockIcon />}
            >
              <form onSubmit={handlePasswordSave} noValidate>
                <FormField
                  label="Current Password"
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  error={passwordErrors.currentPassword}
                />

                <Divider sx={{ my: 2, borderColor: '#f3f4f6' }} />

                <FormField
                  label="New Password"
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  error={passwordErrors.newPassword}
                />

                <FormField
                  label="Confirm New Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                  }
                  error={passwordErrors.confirmPassword}
                />

                <Button
                  type="submit"
                  disabled={isSavingPassword}
                  className="flex items-center gap-2"
                >
                  {isSavingPassword ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <LockIcon sx={{ fontSize: 18 }} />
                      Change Password
                    </>
                  )}
                </Button>
              </form>
            </SectionCard>
          </>
        )}
      </main>
    </div>
  );
}
