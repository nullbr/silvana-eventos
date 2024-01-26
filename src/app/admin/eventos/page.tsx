"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/app/_components/Shared/Button";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { PaginationType } from "~/app/_components/Table/Pagination";
import { Table } from "~/app/_components/Table/Table";
import { api } from "~/trpc/react";

const cols = [
  {
    key: "title",
    label: <p>Título</p>,
  },
  {
    key: "description",
    label: <p>Descrição</p>,
  },
  {
    key: "date",
    label: <p>Data</p>,
  },
  {
    key: "updatedAt",
    label: <p>Atualizado</p>,
  },
];

export default function Events() {
  const router = useRouter();
  const { mutateAsync: removeEvent } = api.event.remove.useMutation();
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

  function handleTableChange(pagination: PaginationType) {
    setQuery(pagination);
  }

  function handleEdit(id: string) {
    const slug = events.find((event) => event.id === id)?.slug;

    if (!slug) return;
    router.push(`/admin/eventos/${slug}`);
  }

  async function handleRemove(id: string): Promise<void> {
    if (eventsQuery.isLoading) return;

    const result = await removeEvent(id);
    if (!result) return alert("Erro ao remover evento");

    await eventsQuery.refetch();
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Eventos" summary="Lista de eventos" />

      <div>
        <div className="flex w-full justify-end">
          <Button
            href="/admin/eventos/novo"
            name="Criar Novo"
            style="green"
            className="my-4"
          />
        </div>

        <Table
          columns={cols}
          data={events.map((event) => ({
            id: event.id,
            title: event.title,
            date: event.date,
            description: event.description,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
          }))}
          loading={eventsQuery.isLoading}
          pagination={query}
          onChange={handleTableChange}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}
