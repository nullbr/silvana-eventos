"use client";

import { useState } from "react";
import { Table } from "../Table/Table";
import { CreateTag } from "./CreateTag";
import { TagType } from "~/app/admin/tags/page";

export function TagsTable({
  handleCreate,
  handleRemove,
  data,
  cols,
}: {
  handleCreate: (name: string) => Promise<TagType>;
  handleRemove: (id: string) => Promise<boolean>;
  data: any;
  cols: any;
}) {
  const [tags, setTags] = useState(data.tags);

  console.log(tags);

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
