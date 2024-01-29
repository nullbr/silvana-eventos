"use client";

import { useState } from "react";
import type { TableColumns, TableData, TableItem } from "../Table/Table";
import { Table } from "../Table/Table";
import { CreateTag } from "./CreateTag";

export function TagsTable({
  handleCreate,
  handleRemove,
  data,
  cols,
}: {
  handleCreate: (name: string) => Promise<TableItem>;
  handleRemove: (id: string) => Promise<boolean>;
  data: { tags: TableData };
  cols: TableColumns;
}) {
  const [tags, setTags] = useState(data.tags);

  return (
    <>
      <CreateTag handleCreate={handleCreate} setTags={setTags} />
      <Table
        columns={cols}
        data={tags}
        handleRemove={handleRemove}
        setData={setTags}
      />
    </>
  );
}
