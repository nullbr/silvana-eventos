"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { api } from "~/trpc/react";

export default function NewEvent() {
  const session = useSession();

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      console.log("Evento criado com sucesso!");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      console.log("Tag criada com sucesso!");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    });
  }

  if (session.status === "loading") return null;

  if (session.status !== "authenticated") return redirect("/api/auth/signin");

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
            required
            type="date"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-6 grid gap-6">
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
            required
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Detalhes do evento..."
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Natal, Jantar, Família..."
            required
          />
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
