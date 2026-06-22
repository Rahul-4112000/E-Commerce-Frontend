import React from "react";

export interface Column<T> {
  header: React.ReactNode;
  key: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  tableClassName?: string;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  loadingMessage?: React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  className = "",
  tableClassName = "",
  isLoading = false,
  emptyState,
  loadingMessage,
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <table className={`w-full text-left border-collapse ${tableClassName}`}>
        <thead>
          <tr className="bg-gray-50/70 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 font-semibold text-xs text-gray-500 ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 text-sm">
                {loadingMessage || (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading data...
                  </div>
                )}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 text-sm">
                {emptyState || "No records found."}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-gray-50/50 transition-colors duration-200"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 text-sm text-gray-700 ${col.className || ""}`}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
