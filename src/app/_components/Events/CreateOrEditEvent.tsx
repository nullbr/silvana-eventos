"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { EventType } from "~/types/Event";

export function CreateOrEditEvent({ event }: { event?: EventType }) {
  const router = useRouter();
  const session = useSession();

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      console.log("Evento criado com sucesso!");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = api.tag.allTags.useQuery();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      date: string;
      tags: string;
    };

    await createEvent.mutateAsync({
      title: entries.title,
      slug: entries.title.toLowerCase().replace(/\s/g, "-"),
      date: new Date(entries.date),
      description: entries.description,
      tags: selectedTags,
    });

    // redirect to events page
    router.push("/admin/eventos");
  }

  if (session.status === "loading") return null;

  if (session.status !== "authenticated") return redirect("/api/auth/signin");

  console.log(event?.eventTags.map((tag) => tag.tagId));

  // console.log(tags.data?.tags[0].id);

  return (
    <form onSubmit={handleSubmit}>
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
            defaultValue={event?.date.toDateString() ?? ""}
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
                  checked={event?.eventTags
                    .map((tag) => tag.tagId)
                    .includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags((prev) => [...prev, e.target.value]);
                    } else {
                      setSelectedTags((prev) =>
                        prev.filter((item) => item !== e.target.value),
                      );
                    }
                  }}
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

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Salvar
      </button>
    </form>
  );
}
