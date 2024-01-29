import { api } from "~/trpc/server";
import Tag from "../Shared/Tag";

export async function Tags({ tags }: { tags: string[] }) {
  const tagsQuery = await api.tag.allTags.query({ ids: tags });

  if (!tagsQuery.tags) return null;

  return (
    <>
      {tagsQuery.tags.map((tag) => (
        <Tag key={tag.id} tag={tag.name} />
      ))}
    </>
  );
}
