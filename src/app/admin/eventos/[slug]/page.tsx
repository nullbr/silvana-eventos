import type { GetStaticPropsContext } from "next";
import { CreateOrEditEvent } from "~/app/_components/Events/CreateOrEditEvent";
import { PageTitle } from "~/app/_components/Shared/PageTitle";
import NotFound from "~/app/not-found";
import { api } from "~/trpc/server";
import { TagType } from "~/types/Tag";

export default async function EventPage(
  context: GetStaticPropsContext<{ slug: string }>,
) {
  if (!context.params) return <NotFound />;

  const { slug } = context.params;
  const event = await api.event.find.query(slug);

  if (!event) return <NotFound />;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title={`Editar ${event.title}`} />

      <div className="pt-4">
        <CreateOrEditEvent event={event} />
      </div>
    </div>
  );
}
