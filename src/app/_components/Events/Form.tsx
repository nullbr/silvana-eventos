"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import type {
  Event as EventType,
  EventTag as EventTagType,
  Image as ImageType,
  Event,
} from "@prisma/client";
import { uploadImageToStorage } from "~/firebase/client/firebase";
import { Buttons } from "./Buttons";

export type FullEvent = EventType & {
  eventTags: EventTagType[];
  eventImages: ImageType[];
  defaultImage: ImageType | null;
};

export type FormEntries = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  description: string;
  tags: string[];
  preview: boolean;
};

export function Form({
  handleSubmit,
  isLoading,
  event,
}: {
  handleSubmit: (entries: FormEntries) => Promise<EventType | undefined>;
  isLoading?: boolean;
  event?: FullEvent;
}) {
  const session = useSession();
  const tags = api.tag.allTags.useQuery();
  const eventTags = event?.eventTags.map((tag) => tag.tagId) ?? [];
  const [selectedTags, setSelectedTags] = useState<string[]>(eventTags);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(event?.preview ?? false);
  const { mutateAsync: createImage } = api.image.create.useMutation();
  const { mutateAsync: deleteImage } = api.image.delete.useMutation();
  const { mutateAsync: updateEvent } =
    api.event.updateDefaultImage.useMutation();

  function toggleTag(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked)
      return setSelectedTags((prev) => [...prev, e.target.value]);

    return setSelectedTags((prev) =>
      prev.filter((item) => item !== e.target.value),
    );
  }

  async function handleDefaultImage({
    file,
    event,
  }: {
    file: File;
    event: Event;
  }) {
    if (uploading || file.size === 0 || !event) return;

    setUploading(true);

    if (event.defaultImageId) await deleteImage({ id: event.defaultImageId });

    const result = await uploadImageToStorage({ file });

    if (result) {
      const newImage = await createImage({ ...result, eventId: event.id });
      await updateEvent({ id: event.id, defaultImageId: newImage.id });
    }

    setUploading(false);
  }

  async function submitEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading ?? !event) return;

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      date: string;
      tags: string;
      defaultImage: File;
      preview: string;
    };

    const result = await handleSubmit({
      id: event?.id,
      title: entries.title,
      slug: entries.title.toLowerCase().replace(/\s/g, "-"),
      date: new Date(entries.date),
      description: entries.description,
      tags: selectedTags,
      preview: !!entries?.preview,
    });

    if (!result) return;

    await handleDefaultImage({
      file: entries.defaultImage,
      event: result,
    });
  }

  if (session.status === "loading") return null;
  if (session.status !== "authenticated") return redirect("/api/auth/signin");

  console.log(event);

  return (
    <form onSubmit={submitEvent}>
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
            defaultValue={event?.description ?? ""}
            required
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Detalhes do evento..."
          />
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="defaultImage"
          >
            Imagem capa
          </label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="defaultImage"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            name="defaultImage"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Preview
          </label>
          <div className="relative cursor-pointer items-center">
            <input
              id="preview"
              name="preview"
              type="checkbox"
              className="peer sr-only"
              checked={preview}
              onChange={() => setPreview((prev) => !prev)}
            />
            <div
              onClick={() => setPreview((prev) => !prev)}
              className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"
            />
          </div>
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
            {tags.data?.tags.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">
                Nenhuma tag cadastrada
              </p>
            )}
          </div>
        </div>
      </div>

      <Buttons event={event} isLoading={isLoading ?? uploading} />
    </form>
  );
}
