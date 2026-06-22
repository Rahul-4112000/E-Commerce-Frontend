import React from 'react';
import { Button } from './atoms/Button';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 flex flex-col items-center gap-5">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </div>

        {/* Title & Body */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{children}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full mt-1">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 !py-2.5 !px-4 !text-sm !rounded-xl"
          >
            {cancelLabel}
          </Button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging out...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
