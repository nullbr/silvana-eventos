"use client";

import { RemoveButton } from "./RemoveButton";

export type TableColumns = {
  className?: string;
  style?: {
    width: string;
    minWidth: string;
    maxWidth: string;
    textAlign: string;
  };
  value?: (item: TableItem, _parentItem: TableData) => React.JSX.Element;
  key: string;
  object?: boolean;
  label: React.JSX.Element;
}[];

export type TableItem = {
  [key: string]: string | number | boolean | Date;
};

export type TableData = TableItem[];

export function Table({
  columns,
  data,
  handleRemove,
  setData,
}: {
  columns: TableColumns;
  data: TableData;
  handleRemove?: (id: string) => Promise<boolean>;
  setData?: React.Dispatch<React.SetStateAction<TableData>>;
}) {
  async function removeItem(id: string) {
    if (!handleRemove) return;

    const result = await handleRemove(id);
    if (!result) {
      alert("Erro ao remover item");
      return;
    }

    if (!setData) return;
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  function renderValue(item: TableData[0], col: TableColumns[0]) {
    if (col?.value) return col.value(item, data);

    if (!col?.value) {
      if (typeof item[col.key] === "object") {
        const dateItem = item[col.key] as Date;
        return dateItem?.toLocaleDateString();
      }

      return item[col.key]?.toString();
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`${col.className ? col.className : "px-6 py-3"}`}
              >
                {col.label}
              </th>
            ))}
            {handleRemove && (
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {columns.map((currentCol, idx) => {
                  return (
                    <td className="px-6 py-4" key={`${index}-${idx}`}>
                      {renderValue(item, currentCol)}
                    </td>
                  );
                })}
                {handleRemove && !!item.id && (
                  <td className="px-6 py-4">
                    <RemoveButton
                      id={item.id.toString()}
                      handleRemove={removeItem}
                    />
                  </td>
                )}
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                Nenhum item encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
