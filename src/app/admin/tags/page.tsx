import { api } from "~/trpc/server";

export default function Tags() {
  const tags = api.tag.allTags.query().then((tags) => {
    return tags;
  });

  console.log(tags);

  return <div>Tags</div>;
}
