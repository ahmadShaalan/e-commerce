import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string;
  empty?: ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  empty,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">
        {empty ?? 'No data.'}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-left">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-medium  ${column.headerClassName ?? 'text-zinc-600'}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {data.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-zinc-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 ${column.className ?? ''}`}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
