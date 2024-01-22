"use client";

import { useRouter } from "next/navigation";
import { Form } from "~/app/_components/Events/Form";
import LoadingIndicator from "~/app/_components/Shared/LoadingIndicator";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import { api } from "~/trpc/react";

export default function NewEventPage() {
  const router = useRouter();

  const { mutate, isLoading } = api.event.create.useMutation({
    onSuccess: () => {
      console.log("Evento criado com sucesso!");
      router.push("/admin/eventos");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    selectedTags: string[],
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      date: string;
      tags: string;
    };

    mutate({
      title: entries.title,
      slug: entries.title.toLowerCase().replace(/\s/g, "-"),
      date: new Date(entries.date),
      description: entries.description,
      tags: selectedTags,
    });
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Novo Evento" />

      <div className="pt-4">
        <Form handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
