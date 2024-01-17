import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { Table, TableColumns } from "~/app/_components/Table/Table";
import { api } from "~/trpc/server";

export default async function Tags() {
  const tags = await api.tag.allTags.query();

  console.log("tags", tags);

  const cols: TableColumns = [
    {
      key: "name",
      label: <p>Name</p>,
      value: (tag) => tag.name,
    },
    {
      key: "createdAt",
      label: <p>Criado</p>,
      value: (tag) => tag.createdAt,
    },
    {
      key: "updatedAt",
      label: <p>Atualizado</p>,
      value: (tag) => tag.updatedAt,
    },
    {
      key: "actions",
      label: <p>Ações</p>,
      value: (tag) => tag.id,
    },
  ];

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Tags" summary="Lista de tags" />
      <Table columns={cols} />
    </div>
  );
}
