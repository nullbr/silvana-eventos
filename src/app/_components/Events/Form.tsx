"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { EventType } from "~/types/Event";
import { Button } from "../Shared/Button";

export function Form({
  handleSubmit,
  isLoading,
  event,
}: {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    selectedTags: string[],
  ) => void;
  isLoading?: boolean;
  event?: EventType;
}) {
  const session = useSession();
  const tags = api.tag.allTags.useQuery();
  const eventTags = event?.eventTags.map((tag) => tag.tagId) ?? [];
  const [selectedTags, setSelectedTags] = useState<string[]>(eventTags);

  function toggleTag(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) return setSelectedTags((prev) => [...prev, e.target.value]);

    return setSelectedTags((prev) => prev.filter((item) => item !== e.target.value));
  }

  if (session.status === "loading") return null;
  if (session.status !== "authenticated") return redirect("/api/auth/signin");

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedTags)}>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Titulo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={event?.title ?? ""}
            required
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Jantar de Natal"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Data
          </label>
          <input
            id="date"
            name="date"
            defaultValue={event?.date.toISOString().split("T")[0] ?? ""}
            required
            type="date"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-6">
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={event?.description ?? ""}
            required
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Detalhes do evento..."
          />
        </div>
      </div>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {(tags.data?.tags ?? []).map((tag, index) => (
              <div
                key={tag.id}
                className={`flex gap-2 ${index > 0 ? "pl-2" : ""}`}
              >
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={toggleTag}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor={tag.name}
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button name="Salvar" style="green" loading={isLoading} type="submit" />
        <Button name="Cancelar" href="/admin/eventos" style="red" />
      </div>
    </form>
  );
}
