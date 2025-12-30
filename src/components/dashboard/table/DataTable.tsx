import React from "react";

type DataTableProps = {
  headers: string[];
  children: React.ReactNode;
};

const DataTable = ({ headers, children }: DataTableProps) => {
  return (
    <div className="overflow-auto h-[88vh] overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        {/* ---------- Table Head ---------- */}
        <thead className="bg-blue">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-sm font-semibold text-white"
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
