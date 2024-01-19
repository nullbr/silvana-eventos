"use client";

import { useState } from "react";

export type PaginationType = {
  pagination: {
    current: number;
    perPage: 10 | 20 | 30 | 40 | 50;
    pages: number;
  };
  showSizeChanger: boolean;
};

export function Pagination({
  pagination,
  onChange,
}: {
  pagination: false | PaginationType;
  onChange?: (pagination: PaginationType) => void;
}) {
  if (!pagination) return null;

  return (
    <nav
      className="flex-column flex flex-wrap items-center justify-end pt-4 md:flex-row"
      aria-label="Table navigation"
    >
      <div className="flex gap-2">
        <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
          <li>
            <button
              type="button"
              disabled={pagination.pagination.current === 1}
              className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 ${defaultButtonClasses}`}
              onClick={() => {
                if (!onChange) return;

                onChange({
                  ...pagination,
                  pagination: {
                    ...pagination.pagination,
                    current: pagination.pagination.current - 1,
                  },
                });
              }}
            >
              Anterior
            </button>
          </li>

          {Array.from(Array(pagination.pagination.pages).keys()).map((page) => {
            const isCurrent = page + 1 === pagination.pagination.current;

            return (
              <li key={page}>
                <button
                  type="button"
                  disabled={isCurrent}
                  className={`flex h-8 items-center justify-center border border-gray-300 ${
                    isCurrent
                      ? "bg-blue-50 px-3 text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : defaultButtonClasses
                  }`}
                  onClick={() => {
                    if (!onChange) return;

                    onChange({
                      ...pagination,
                      pagination: {
                        ...pagination.pagination,
                        current: page + 1,
                      },
                    });
                  }}
                >
                  {page + 1}
                </button>
              </li>
            );
          })}

          <li>
            <button
              type="button"
              disabled={
                pagination.pagination.current === pagination.pagination.pages
              }
              className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 ${defaultButtonClasses}`}
              onClick={() => {
                if (!onChange) return;

                onChange({
                  ...pagination,
                  pagination: {
                    ...pagination.pagination,
                    current: pagination.pagination.current + 1,
                  },
                });
              }}
            >
              Próximo
            </button>
          </li>
        </ul>
        <SizeChanger pagination={pagination} onChange={onChange} />
      </div>
    </nav>
  );
}

function SizeChanger({
  pagination,
  onChange,
}: {
  pagination: PaginationType;
  onChange?: (pagination: PaginationType) => void;
}) {
  const options = [10, 20, 30, 40, 50];

  if (!pagination.showSizeChanger) return null;

  return (
    <select
      id="small"
      className="block rounded-lg border border-gray-300 bg-white py-1 pl-2 pr-8 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      value={pagination.pagination.perPage}
      onChange={(e) => {
        if (!onChange) return;

        onChange({
          ...pagination,
          pagination: {
            ...pagination.pagination,
            perPage: parseInt(e.target.value) as 10 | 20 | 30 | 40 | 50,
          },
        });
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option} por página
        </option>
      ))}
    </select>
  );
}

const defaultButtonClasses =
  "bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
