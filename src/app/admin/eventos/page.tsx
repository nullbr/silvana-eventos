"use client";

import { useEffect, useState } from "react";
import CustomLink from "~/app/_components/Shared/Link";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { PaginationType } from "~/app/_components/Table/Pagination";
import { Table } from "~/app/_components/Table/Table";
import { api } from "~/trpc/react";

export default function Events() {
  const [query, setQuery] = useState<PaginationType>({
    pagination: {
      perPage: 10,
      current: 1,
      pages: 0,
      size: 0,
    },
    showSizeChanger: true,
  });

  const eventsQuery = api.event.paginatedEvents.useQuery({
    limit: query.pagination.perPage,
    page: query.pagination.current,
  });

  const events = eventsQuery.data?.events ?? [];

  useEffect(() => {
    if (!eventsQuery.data) return;

    setQuery((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pages: eventsQuery.data.pages,
        size: eventsQuery.data.size,
      },
    }));
  }, [eventsQuery.data]);

  const cols = [
    {
      key: "title",
      label: <p>Título</p>,
    },
    {
      key: "date",
      label: <p>Data</p>,
    },
    {
      key: "createdAt",
      label: <p>Criado</p>,
    },
    {
      key: "updatedAt",
      label: <p>Atualizado</p>,
    },
  ];

  function handleTableChange(pagination: PaginationType) {
    setQuery(pagination);
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Eventos" summary="Lista de eventos" />

      <div>
        <CustomLink href="/admin/eventos/novo">criar evento</CustomLink>

        <Table
          columns={cols}
          data={events.map((event) => ({
            title: event.title,
            date: event.date,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
          }))}
          loading={eventsQuery.isLoading}
          pagination={query}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}
