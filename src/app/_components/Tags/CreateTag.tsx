"use client";

import { useState } from "react";
import { Button } from "../Shared/Button";
import { TableItem } from "../Table/Table";

export function CreateTag({
  handleCreate,
  setTags,
}: {
  handleCreate: (name: string) => Promise<TableItem>;
  setTags: React.Dispatch<React.SetStateAction<TableItem[]>>;
}) {
  const [name, setName] = useState("");

  async function clientHandleCreate() {
    const result = await handleCreate(name);

    if (result) {
      setTags((prev) => [...prev, result]);
      return setName("");
    }

    console.log("Erro ao criar tag");
  }

  return (
    <div className="flex w-full items-center gap-2 py-2">
      <label htmlFor="name" className="sr-only">
        Adicionar
      </label>
      <div className="w-full">
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Nome da tag..."
          required
        />
      </div>
      <Button
        name="Adicionar"
        type="submit"
        style="green"
        onAction={clientHandleCreate}
      />
    </div>
  );
}
