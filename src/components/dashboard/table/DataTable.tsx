import React from "react";

type DataTableProps = {
  headers: string[];
  children: React.ReactNode;
};

const DataTable = ({ headers, children }: DataTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        {/* ---------- Table Head ---------- */}
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* ---------- Table Body ---------- */}
        <tbody className="divide-y divide-slate-200">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
