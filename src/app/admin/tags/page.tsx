import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { TableColumns } from "~/app/_components/Table/Table";
import { TagsTable } from "~/app/_components/Tags/TagsTable";
import { api } from "~/trpc/server";

export type TagType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

async function handleRemove(id: string) {
  "use server";

  const result = await api.tag.delete.mutate(id);
  return !!result;
}

async function handleCreate(name: string) {
  "use server";

  return await api.tag.create.mutate({ name });
}

export default async function Tags() {
  const data = await api.tag.allTags.query();

  const cols: TableColumns = [
    {
      key: "name",
      label: <p>Name</p>,
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

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Tags" summary="Lista de tags" />

      <TagsTable
        handleCreate={handleCreate}
        handleRemove={handleRemove}
        data={data}
        cols={cols}
      />
    </div>
  );
}
